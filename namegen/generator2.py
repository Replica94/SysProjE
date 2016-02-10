# creates markov chains out of existing drug names
# and uses them to generate new drug names

# Alternative version: uses order-2 markov chains (uses two
# previous letters instead of just one)

import random

MIN_LENGTH = 5
MAX_LENGTH = 15
GENERATE_COUNT = 1000
END_WORD = '$'
START_WORD = '^'

def main():
	firstletters = dict()
	pairs = dict()
	blacklist = list()
	
	# generate markov chains
	with open('names.txt', 'r', encoding='utf-8') as f:
		for line in f.readlines():
			line = START_WORD + line.strip()
			# first letter
			firstletter = line[0:2]
			increment_dict_item(firstletters, firstletter)			

			# rest of the letters
			for i in range(2, len(line)):
				increment_pair(pairs, line[i-2]+line[i-1], line[i])
			increment_pair(pairs, line[-2:], END_WORD)
		
	normalize_values(firstletters)
	normalize_pairs(pairs)

	blacklist = load_blacklist()

	random.seed()
	with open('drugnames.txt', 'w', encoding='utf-8') as f:
		for i in range(0, GENERATE_COUNT):
			name = generate_name(firstletters, pairs)
			while not validate_name(name, blacklist):
				name = generate_name(firstletters, pairs)
			f.write(name+'\n')

	print("Finished writing random names to drugnames.txt")		

def validate_name(name, blacklist):
	if len(name) < MIN_LENGTH or len(name) > MAX_LENGTH:
		return False
	if name in blacklist:
		print("Generated existing name:", name)
		return False
	return True

def load_blacklist():
	bl = list()
	with open('names.txt', encoding='utf-8') as f:
		lines = [line.strip() for line in f.readlines()]
		bl.extend(lines)
	with open('packages.txt', encoding='utf-8') as f:
		lines = [line.strip() for line in f.readlines()]
		bl.extend(lines)
#	print("\n".join(bl[0:100]))
	return bl

def generate_name(firstletters, pairs):
	name = generate_first_letter(firstletters)
	while True:
		next = generate_next_letter(pairs, name[-2:])
		if next == END_WORD:
			break
		name = name + next
	return name[1:]


def get_random_item(dic):
	n = random.random()
	for key in dic:
		n -= dic[key]
		if n <= 0:
			return key
	keys = list(dic.keys())
	return keys[-1]
	
def generate_first_letter(firstletters):
	return get_random_item(firstletters)
	

def generate_next_letter(pairs, current):
	return get_random_item(pairs[current])

	
def increment_dict_item(dic, key):
	if key in dic:
		dic[key] = dic[key] + 1
	else:
		dic[key] = 1


def increment_pair(pairs, prev, current):
	if prev not in pairs:
		pairs[prev] = dict()
	if current in pairs[prev]:
		pairs[prev][current] = pairs[prev][current] + 1
	else:
		pairs[prev][current] = 1


def normalize_pairs(dic):
	for first in dic.keys():
		normalize_values(dic[first])

def normalize_values(c):
	total = sum(c.values())
	for key in c.keys():
		c[key] = c[key] / total

if __name__ == '__main__':
	main()

