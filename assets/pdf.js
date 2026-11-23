/* Local A4 export: no network, original logo, Unicode rendered by the browser. */
(function () {
  'use strict';
  const W=595.28,H=841.89,M=36,TOP=100,BOTTOM=805;
  function wrap(ctx,text,width) {
    const lines=[];
    for(const paragraph of String(text).replace(/\r\n?/g,'\n').split('\n')) {
      let line='';
      for(const word of paragraph.split(/\s+/).filter(Boolean)) {
        if(ctx.measureText(line+(line?' ':'')+word).width<=width){line+=(line?' ':'')+word;continue;}
        if(line)lines.push(line);
        line='';
        for(const char of Array.from(word)) {
          if(line&&ctx.measureText(line+char).width>width){lines.push(line);line='';}
          line+=char;
        }
      }
      lines.push(line);
    }
    return lines;
  }
  function layout(blocks,size) {
    const ctx=document.createElement('canvas').getContext('2d');
    const pages=[[]];let y=TOP;
    blocks.forEach(b=>{
      const font=b.heading?size+1:size, height=font*1.22;
      ctx.font=(b.heading?'bold ':'')+font+'px Arial';
      const lines=wrap(ctx,b.text,W-2*M);
      if(b.heading&&y+height*3>BOTTOM){pages.push([]);y=TOP;}
      lines.forEach(text=>{
        if(y+height>BOTTOM){pages.push([]);y=TOP;}
        pages[pages.length-1].push({text,y,font,bold:!!b.heading});y+=height;
      });
      y+=b.heading?3:2;
    });
    return pages;
  }
  // PDF objects use byte offsets, including binary JPEG streams.
  function encodePDF(images,fullText) {
    const enc=new TextEncoder(),parts=[],offsets=[0];let length=0;
    const add=x=>{const bytes=typeof x==='string'?enc.encode(x):x;parts.push(bytes);length+=bytes.length;};
    const obj=(id,body)=>{offsets[id]=length;add(id+' 0 obj\n');add(body);add('\nendobj\n');};
    add('%PDF-1.4\n');
    const attachmentId=3+images.length*3;
    obj(1,'<< /Type /Catalog /Pages 2 0 R /Names << /EmbeddedFiles << /Names [(Bilan_detaille.txt) '+attachmentId+' 0 R] >> >> >>');
    obj(2,'<< /Type /Pages /Count '+images.length+' /Kids ['+images.map((_,i)=>(3+i*3)+' 0 R').join(' ')+'] >>');
    images.forEach((image,i)=>{
      const id=3+i*3,stream='q '+W+' 0 0 '+H+' 0 0 cm /Im0 Do Q';
      obj(id,'<< /Type /Page /Parent 2 0 R /MediaBox [0 0 '+W+' '+H+'] /Resources << /XObject << /Im0 '+(id+2)+' 0 R >> >> /Contents '+(id+1)+' 0 R >>');
      obj(id+1,'<< /Length '+enc.encode(stream).length+' >>\nstream\n'+stream+'\nendstream');
      offsets[id+2]=length;add((id+2)+' 0 obj\n<< /Type /XObject /Subtype /Image /Width '+image.width+' /Height '+image.height+' /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length '+image.bytes.length+' >>\nstream\n');add(image.bytes);add('\nendstream\nendobj\n');
    });
    obj(attachmentId,'<< /Type /Filespec /F (Bilan_detaille.txt) /EF << /F '+(attachmentId+1)+' 0 R >> >>');
    const data=enc.encode(fullText);offsets[attachmentId+1]=length;add((attachmentId+1)+' 0 obj\n<< /Type /EmbeddedFile /Subtype /text#2Fplain /Length '+data.length+' >>\nstream\n');add(data);add('\nendstream\nendobj\n');
    const start=length;add('xref\n0 '+offsets.length+'\n0000000000 65535 f \n');
    offsets.slice(1).forEach(x=>add(String(x).padStart(10,'0')+' 00000 n \n'));
    add('trailer\n<< /Size '+offsets.length+' /Root 1 0 R >>\nstartxref\n'+start+'\n%%EOF');
    return new Blob(parts,{type:'application/pdf'});
  }
  async function create({blocks,logo,title,fullText}) {
    const img=new Image();img.src=logo;await img.decode();
    const measure=document.createElement('canvas').getContext('2d');
    const detailIndex=blocks.findIndex(b=>b.text==='Détail des contrôles');
    const reviewIndex=blocks.findIndex(b=>b.text==='Relecture déclarée par l’apprenant');
    const report=blocks[6].text,reportTitle=blocks[5].text;
    const review=blocks.slice(reviewIndex+1,detailIndex);
    const detail=blocks.slice(detailIndex+1,-1),notice=blocks.at(-1).text;
    const pages=[];
    const textLines=(text,size,width,bold=false)=>{measure.font=(bold?'bold ':'')+size+'px Arial';return wrap(measure,text,width);};
    function plan(long,size){
      const ops=[];const rect=(x,y,w,h,color)=>ops.push({rect:true,x,y,w,h,color});
      const text=(value,x,y,font=9,color='#273146',bold=false,width=523)=>{const ls=textLines(value,font,width,bold);ls.forEach((t,i)=>ops.push({text:t,x,y:y+i*font*1.26,font,color,bold}));return y+ls.length*font*1.26;};
      text('BILAN DE MISSION',M,85,10,'#1261a0',true);
      text(title,M,103,23,'#202b40',true);
      rect(M,139,523,34,'#eff4f9');text(blocks[1].text,M+12,149,8.5,'#485268',false,499);
      const stats=blocks[3].text.split(' | '),cw=124;
      stats.forEach((v,i)=>{const at=v.lastIndexOf(' : '),label=v.slice(0,at),value=v.slice(at+3);rect(M+i*133,185,cw,55,i===0?'#172d43':'#f0f5fa');text(value,M+12+i*133,194,20,i===0?'#ffffff':'#12568e',true);text(label,M+12+i*133,220,7,i===0?'#d9eafb':'#647084',false,110);});
      let y=text(blocks[4].text,M,250,8,'#647084')+12;
      if(!long){const lines=textLines(report,10,495),h=lines.length*12.6+40;rect(M,y,523,h,'#eef6fc');rect(M,y,3,h,'#2997ff');text(reportTitle.toUpperCase(),M+14,y+12,8,'#1261a0',true);text(report,M+14,y+28,10,'#273146',false,495);y+=h+11;
        for(const b of review)y=text(b.text,M,y,7.5,'#667085')+2;
        y+=10;
      }else{y=text('RECOMMANDATION ET RELECTURE  →  PAGE 2',M,y,8,'#1261a0',true)+14;}
      text('LES RÉSULTATS PAR MISSION',M,y,10,'#273146',true);y+=20;
      const legend=detail[0].text;y=text(legend,M,y,7,'#647084')+10;
      const top=y,bottom=775,width=250,gap=23;let column=0,mission=0;
      const split=Math.ceil(detail.filter(b=>b.heading).length/2);
      for(let i=1;i<detail.length;i++){
        const b=detail[i],font=b.heading?size+0.8:size;
        if(b.heading&&mission++===split){column=1;y=top;}
        const ls=textLines(b.text,font,width-16,b.heading),h=ls.length*font*1.26+(b.heading?17:7);
        const next=detail[i+1];let reserve=0;
        if(b.heading&&next)reserve=textLines(next.text,size,width-16).length*size*1.26+7;
        if(y+h+reserve>bottom){column++;y=top;}
        if(column>1)return null;
        const x=M+column*(width+gap);
        if(b.heading){rect(x,y,width,h-4,'#eaf2f9');text(b.text,x+8,y+6,font,'#175689',true,width-16);}else{text(b.text,x+8,y,font,'#354056',false,width-16);rect(x+8,y+h-4,width-16,0.4,'#e7e7ee');}
        y+=h;
      }
      text(notice,M,785,6.8,'#768094',false,523);
      return ops;
    }
    let long=report.length>950,ops;
    for(let size=10;size>=8.5;size-=0.25){ops=plan(long,size);if(ops)break;}
    if(!ops&&!long){long=true;for(let size=9;size>=7;size-=0.25){ops=plan(long,size);if(ops)break;}}
    if(!ops)throw new Error('Le détail dépasse la capacité de deux pages. Utiliser l’export texte.');
    pages.push(ops);
    if(long){
      const second=[];
      const add=(text,x,y,font,color,bold=false)=>second.push({text,x,y,font,color,bold});
      add('LE RAISONNEMENT',M,85,10,'#1261a0',true);add(reportTitle,M,106,23,'#202b40',true);
      let selected;
      for(let size=11;size>=6;size-=0.25){
        let clean=report;
        let lines=textLines(clean,size,491),reviews=review.flatMap(b=>textLines(b.text,8,499));
        if(160+lines.length*size*1.4+75+reviews.length*11<780){selected={size,lines,reviews};break;}
        if(size===6){clean=report.replace(/\s+/g,' ');lines=textLines(clean,size,491);selected={size,lines,reviews};}
      }
      const {size,lines,reviews}=selected;const h=lines.length*size*1.4+32;
      second.push({rect:true,x:M,y:146,w:523,h,color:'#f0f6fb'});
      second.push({rect:true,x:M,y:146,w:3,h,color:'#2997ff'});
      let y=162;lines.forEach(line=>{add(line,M+16,y,size,'#273146');y+=size*1.4;});
      y+=31;add('RELECTURE DE L’APPRENANT',M,y,9,'#1261a0',true);y+=22;
      reviews.forEach(line=>{add(line,M+8,y,8,'#647084');y+=11;});
      if(y>795)throw new Error('Texte trop fragmenté pour deux pages. Utiliser l’export texte.');
      pages.push(second);
    }
    const images=pages.map((lines,index)=>{
      const canvas=document.createElement('canvas');canvas.width=Math.ceil(W*3);canvas.height=Math.ceil(H*3);
      const ctx=canvas.getContext('2d');ctx.scale(3,3);ctx.fillStyle='#fff';ctx.fillRect(0,0,W,H);ctx.textBaseline='top';
      ctx.fillStyle='#172d43';ctx.fillRect(0,0,W,7);
      const ratio=Math.min(105/img.naturalWidth,45/img.naturalHeight);ctx.drawImage(img,M,23,img.naturalWidth*ratio,img.naturalHeight*ratio);
      ctx.font='bold 9px Arial';ctx.fillStyle='#175689';ctx.textAlign='right';ctx.fillText('NCR / FORMATION',W-M,30);
      ctx.font='8px Arial';ctx.fillStyle='#8890a0';ctx.fillText('BTS MCO · GESTION OPÉRATIONNELLE',W-M,46);ctx.textAlign='left';
      lines.forEach(l=>{if(l.rect){ctx.fillStyle=l.color;ctx.fillRect(l.x,l.y,l.w,l.h);}else{ctx.font=(l.bold?'bold ':'')+l.font+'px Arial';ctx.fillStyle=l.color;ctx.fillText(l.text,l.x,l.y);}});
      ctx.fillStyle='#e6e4ec';ctx.fillRect(M,813,523,0.6);
      ctx.fillStyle='#768094';ctx.font='7px Arial';ctx.fillText('NCR Solutions   /   Bilan individuel d’entraînement',M,823);ctx.textAlign='right';ctx.fillText(String(index+1).padStart(2,'0')+' / '+String(pages.length).padStart(2,'0'),W-M,823);
      const bytes=Uint8Array.from(atob(canvas.toDataURL('image/jpeg',0.96).split(',')[1]),c=>c.charCodeAt(0));
      return {bytes,width:canvas.width,height:canvas.height};
    });
    return {blob:encodePDF(images,fullText),pages:pages.length};
  }
  window.NCRPDF={create,layout};
})();
