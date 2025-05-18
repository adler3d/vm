if(typeof game_table=='undefined')game_table=[];
//game_table=[];
if('user' in qp)game_table.push({'#':0,user:POST.user?POST.user:"nope",ms:POST.ms?POST.ms:200,date:getDateTime()});
//fs.writeFileSync("",POST.code);
// 
qapsort(game_table,ex=>ex.ms);
game_table.map((ex,i)=>ex['#']=i+1);
return ('user' in qp)?(('json' in qp)?JSON.stringify:maps2csv)(game_table):jstable(game_table);//html_utf8('<body>'+os.uptime()+'</body>');
