from PIL import Image

import glob

im = Image.open("musk.webp")

rgb_im = im.convert('RGB')

rgb_im.save("musk.jpg", quality=95)