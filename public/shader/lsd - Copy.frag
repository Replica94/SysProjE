precision mediump float;

varying vec2 texCoord;

vec3 hueShift(vec3 color, float hueAdd)
{
	const vec3  kRGBToYPrime = vec3 (0.299, 0.587, 0.114);
    const vec3  kRGBToI     = vec3 (0.596, -0.275, -0.321);
    const vec3  kRGBToQ     = vec3 (0.212, -0.523, 0.311);

    const vec3  kYIQToR   = vec3 (1.0, 0.956, 0.621);
    const vec3  kYIQToG   = vec3 (1.0, -0.272, -0.647);
    const vec3  kYIQToB   = vec3 (1.0, -1.107, 1.704);
	float   YPrime  = dot (color, kRGBToYPrime);
    float   I      = dot (color, kRGBToI);
    float   Q      = dot (color, kRGBToQ);

    // Calculate the hue and chroma
    float   hue     = atan (Q, I);
    float   chroma  = sqrt (I * I + Q * Q);

    // Make the user's adjustments
    hue += hueAdd;

    // Convert back to YIQ
    Q = chroma * sin (hue);
    I = chroma * cos (hue);

    // Convert back to RGB
    return vec3 (YPrime, I, Q);
}

vec3 getPal(vec3 col)
{
	col.r = min(col.r,1.0);
	col.g = min(col.g,1.0);
	col.b = min(col.b,1.0);
	const float count = 2.0;
	col.r = floor(col.r*count+0.5)/count;
	col.g = floor(col.g*count+0.5)/count;
	col.b = floor(col.b*count+0.5)/count;
	return col;
}

uniform float time;
uniform float clickTime;
uniform float clickData;
uniform vec2 clickPos;
uniform sampler2D texture;

void main()
{
	vec2 crd;
	
	vec2 dir = (clickPos-gl_FragCoord.xy);
	
	vec2 coid = gl_FragCoord.xy/12.0;
	
	float parm1 = 1.0 * cos(coid.x - time);
	float parm2 = 2.0 * pow(cos(coid.y + time),3.0);
	
	dir = normalize(dir);
	dir.x += (sin(coid.x-coid.y)-sin(coid.y)-parm1)/12.0;
	dir.y += (cos(coid.x-coid.y)+parm2-sin(coid.y))/12.0;
	
	float dismul = length((clickPos-gl_FragCoord.xy))+200.0;
	dismul = dismul - clickData*100.0;
	
	
	
	dismul = abs(dismul);
	
	dismul = pow(0.99,dismul);
	
	crd = gl_FragCoord.xy/1490.0;
	
	crd += dir*(dismul) * 0.3;
	
	dir *= dismul;
	vec3 asdfasdf = vec3(dir, cos(crd.y-time) + sin(crd.x-time) - cos(dir.y * crd.y));
	
	crd.y += 2.0 * cos(time/46.0);
	crd.x += 1.0 * cos(time/31.0)-sin(crd.y)*1.0;
	crd /= 1.8;
	float dif = sin(crd.x*crd.y*65.0+time)-cos(crd.x-time);
	float casd = cos(time-sin(crd.y*18.0)-3.0*cos(crd.x*8.0));
	
	float r = crd.x*dif;
	float g = casd/1.5;
	float b = pow(1.0-r*g,3.0);
	
	float lum = r+g+b;
	lum /= 3.0;
	
	
	float dots = 1.0/(4.2+1.1*sin(time/8.0));
	float drot = 66.6+time/24.0;
	float x1m = dots*sin(drot);
	float y1m = -dots*cos(drot);
	float x2m = dots*cos(drot);
	float y2m = -dots*sin(drot);
	
	float off1 = time/8.0;
	float off2 = -time/7.0;
	
	float thres = sin(gl_FragCoord.x*x1m+gl_FragCoord.y*y1m+off1)+sin(gl_FragCoord.x*x2m-gl_FragCoord.y*y2m+off2);
	thres *= 0.1;
	thres += 1.0;
	
	
	vec3 tar = hueShift(vec3(r,g,b),1.0*time+sin((crd.x+crd.y)*4.0)*8.0)*thres;
	vec3 trutar = getPal(tar)*0.55+tar*0.45;
	float val = 0.0+dot(trutar,asdfasdf);
	gl_FragColor.rgb = (trutar+vec3(1,1,1)*val)/(2.0-val);
	
	float alpha = texture2D(texture, vec2(texCoord.s, texCoord.t)).a;
	gl_FragColor.rgba = texture2D(texture, vec2(texCoord.s, texCoord.t)).rgba;

	//if (alpha < 0.5)
		//discard;
	//gl_FragColor.a = 1.0;
}