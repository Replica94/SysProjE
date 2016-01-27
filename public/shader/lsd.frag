precision mediump float;

varying vec2 texCoord;

uniform float time;
uniform float clickTime;
uniform float clickData;
uniform vec2 clickPos;
uniform sampler2D texture;

void main()
{
	
	vec2 coid = texCoord/12.0;
	vec2 crd = texCoord;
	
	float alpha = texture2D(texture, vec2(crd.s, crd.t)).a;
	gl_FragColor.rgba = texture2D(texture, vec2(crd.s, crd.t)).rgba;

	//if (alpha < 0.5)
	//	discard;
	//gl_FragColor.a = 1.0;
}