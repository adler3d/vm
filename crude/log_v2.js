var arr=getarr(getmap(g_obj,'logs'),os.hostname());var x="hjggjhgjhg7g7g07g7gip";
arr=arr.filter(e=>{var e=json(e);return (e.includes("market")||e.includes("curl")||e.includes("gd")||e.includes("game_players_table.js"))&&!e.includes("GFX")&&!e.includes(x);});
return html_utf8(maps2table(arr));
