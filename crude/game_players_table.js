if(typeof game_table=='undefined')game_table=[];
//game_table=[];
if('user' in qp)game_table.push({user:POST.user?POST.user:"nope",ms:POST.ms?POST.ms:200,date:getDateTime()});
//fs.writeFileSync("",POST.code);
// 
return ('user' in qp)?(('json' in qp)?JSON.stringify:maps2csv)(game_table):jstable(game_table);//html_utf8('<body>'+os.uptime()+'</body>');
