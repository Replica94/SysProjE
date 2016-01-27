precision mediump float;

varying vec2 texCoord;

uniform sampler2D texture;

void main()
{
	
	gl_FragColor = texture2D(texture, vec2(texCoord.s, texCoord.t));
}