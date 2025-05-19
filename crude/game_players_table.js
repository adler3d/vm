let fn="game_players_table.json";
if(typeof game_table=='undefined'){
  game_table=[];
  let ok=fs.existsSync(fn);
  if(ok)game_table=(fs.readFileSync(fn)+"").split("\n").map(e=>JSON.parse(e));
}
if('user' in qp){
  let rec={'#':0,user:POST.user?POST.user:"nope",sec:POST.sec?POST.sec:200,date:getDateTime(),seed:POST.seed};
  let ok=fs.existsSync(fn);
  if(game_table.length!=0&&!ok){fs.writeFileSync(fn,game_table.map(e=>json(e)).join("\n"));ok=true;}
  game_table.push(rec);
  fs.appendFileSync(fn,(ok?"\n":"")+JSON.stringify(rec));
  return "["+getDateTime()+"]+ ok";
}
let sort_and_update_place=arr=>{qapsort(arr,ex=>-ex.sec);arr.map((ex,i)=>ex['#']=i+1);};
if('unique' in qp)
{
  let m={};
  game_table.map(ex=>{
    if((ex.user in m)&&m[ex.user].sec<ex.sec)return;
    m[ex.user]=ex;
  });
  let arr=[];
  for(let k in m)arr.push(m[k]);
  sort_and_update_place(arr);
  return ('csv' in qp)?maps2csv(arr):jstable(arr);
}else{
  sort_and_update_place(game_table);
}
return ('user' in qp)?(('json' in qp)?JSON.stringify:maps2csv)(game_table):jstable(game_table);//html_utf8('<body>'+os.uptime()+'</body>');
