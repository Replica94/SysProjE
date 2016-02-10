s = set()
with open('drugs.csv', 'r', encoding="utf-8") as f:
	for line in f.readlines():
		parts = line.split(";")
		if len(parts) > 1:
			s.add(parts[11])

if len(s) > 1:
	with open('names.txt', 'w', encoding="utf-8") as f:
		f.write('\n'.join(s))	

print("Wrote", len(s), "lines to names.txt")
