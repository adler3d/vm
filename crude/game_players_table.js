let fn="game_players_table.json";
if(typeof game_table=='undefined'){
  game_table=[];
  let ok=fs.existsSync(fn);
  if(ok)game_table=(fs.readFileSync(fn)+"").split("\n").map(e=>JSON.parse(e));
}
let ok=fs.existsSync(fn);
if(!ok&&game_table.length>0){fs.writeFileSync(fn,game_table.map(e=>json(e)).join("\n"));ok=true;}
let isInt=(n)=>Number(n)===n&&n%1===0;
let isFloat=(n)=>(Number(n)===n&&n%1!==0)||isInt(n);
if(('user' in qp)&&('sec' in qp)&&('seed' in qp)&&('game' in qp)&&isInt(1*POST.seed)&&isFloat(1.0*POST.sec)){
  let rec={'#':0,user:POST.user?POST.user:"nope",sec:POST.sec*1.0,date:getDateTime(),seed:POST.seed*1,game:POST.game,ref:'ref' in qp?POST.ref:"nope"};
  game_table.push(rec);
  fs.appendFileSync(fn,(ok?"\n":"")+json(rec));
  return "["+getDateTime()+"] ok";
}
let sort_and_update_place=arr=>{qapsort(arr,ex=>-(ex.sec*1.0));arr.map((ex,i)=>ex['#']=i+1);};
if('unique' in qp)
{
  let m={};
  let game=('game' in qp)?POST.game:null;
  game_table.filter(e=>game==null?true:e.game==game).map(ex=>{
    if((ex.user in m)&&m[ex.user].sec*1.0<ex.sec*1.0)return;
    m[ex.user]=ex;
  });
  let arr=[];
  for(let k in m)arr.push(m[k]);
  sort_and_update_place(arr);
  arr.length=Math.min(arr.length,256,'n' in qp?POST.n|0:20);
  return ('csv' in qp)?maps2csv(arr):html_utf8(maps2table(arr));
}else{
  sort_and_update_place(game_table);
}
return html_utf8(maps2table(game_table));
