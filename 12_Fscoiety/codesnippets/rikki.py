from requests import get
from requests import get
f=open('places.csv','r')
n=len(f.readlines())
f.close()
#print(n)
f=open('places.csv','r')
a=list(f.readline().split(','))
se=[]
city=[]
se.append(a)
#print(a)
for i in range(n):
    a=list(f.readline().split(','))
    temp=list(a[0].split())
    se.append(a)
    #print(temp)
    try:

        if temp[-1]=='S.O' or temp[-1]=='B.O' or temp[-1]=='H.O' or temp[-1]=='G.P.O.'or temp[-1]=='SO' or len(temp)==1:
        #print(1)
            temp.pop()
        else:
            temp.pop()
            temp.pop()
        #print(temp[-1])
        #print(len(temp))
        city.append(" ".join(temp))

    except:
        pass
print(len(city))
print(city)