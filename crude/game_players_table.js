if(typeof game_table=='undefined')game_table=[];
//game_table=[];
if('user' in qp)game_table.push({'#':0,user:POST.user?POST.user:"nope",sec:POST.sec?POST.sec:200,date:getDateTime()});
//fs.writeFileSync("",POST.code);
// 
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
