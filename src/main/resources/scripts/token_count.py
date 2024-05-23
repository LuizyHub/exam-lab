import sys
import tiktoken

print(len(tiktoken.encoding_for_model('gpt-4o').encode(sys.argv[1])))