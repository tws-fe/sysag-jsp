
var EchartThemeAdapter = {
		
};

EchartThemeAdapter.themes = [
	"", "blue","dark","green","grey","helianthus","infographic",
	"macarons","macarons2","mint","red","roma","sakura","shine"
];


EchartThemeAdapter.themes_array_pair = [];
for(var i = 0; i < EchartThemeAdapter.themes.length; i++){
	EchartThemeAdapter.themes_array_pair.push([EchartThemeAdapter.themes[i], EchartThemeAdapter.themes[i]]);
}
EchartThemeAdapter.themes_array_pair[0][1] = '(default)';

EchartThemeAdapter.themes_map_pair = {};
for(var i = 0; i < EchartThemeAdapter.themes.length; i++){
	EchartThemeAdapter.themes_map_pair[EchartThemeAdapter.themes[i]] = EchartThemeAdapter.themes[i];
}
