import csv
# import pandas
# df = pandas.read_csv('data.csv')
# s=0
# i=0
"""for ind in df.index:
	s+=df['Total Crimes against Women'][ind]
	i+=1
avg=s/i"""
f=open('data.csv')
l=f.readlines()


mini=float("inf")
ma=-float("inf")
for i in range(1,len(l)):
	if int(l[i][-1])<mini:
		mini=int(l[i][-1])
	if int(l[i][-1])>ma:
		ma=int(l[i][-1])
temp=[0 for i in range(1,len(l))]
# for ind in df.index:
# 	l[ind]=((x-mini)*10)/(ma-mini)

for i in range(1,len(l)):
	temp[i-1]=((int(l[i][-1])-mini)*10)/(ma-mini)
print(temp)