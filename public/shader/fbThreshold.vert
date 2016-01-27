attribute vec2 vertex_position;
attribute vec2 vertex_texCoord;

varying vec2 texCoord;
void main()
{
  gl_Position = vec4(vertex_position, 0, 1);
  texCoord = vertex_texCoord;
}