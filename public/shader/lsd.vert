attribute vec2 vertex_position;
attribute vec2 vertex_texCoord;

uniform vec2 size;
uniform vec2 center;
uniform vec2 screenSize;

varying vec2 texCoord;
void main()
{
  gl_Position = vec4(((vertex_position*size + center)*2.0/screenSize)-vec2(1.0,1.0), 0, 1);
  gl_Position.y *= -1.0;
  texCoord = vertex_texCoord;
}