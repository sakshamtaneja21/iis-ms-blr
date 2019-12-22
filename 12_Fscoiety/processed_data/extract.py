import random
f=open('asdf.txt','r')
g=open('crimes.csv','r')
h=open('data.txt','a')
a=g.readlines()
#print(a[9])
b=f.readlines()
#print(a[0])
for i in range(1,len(a)):
    a[i]=list(map(int,a[i].split(',')))
    #a[i][-1]=a[i][-1].strip()
#print(a[2])
a[0]=a[0].split(',')
for i in range(len(b)):
    b[i]=b[i].split(',')
    b[i][-1]=b[i][-1].strip()
#print(a[0])
h.write("city,latitude,longitude"+","+','.join(a[0][0:7])+','+a[0][-1]+','+'00-02'+","+'02-04'+","+'04-06'+","+'06-08'+","+'08-10'+","+'10-12'+","+'12-14'+","+'14-16'+","+'16-18'+","+'18-20'+","+'20-22'+","+'22-24'+'Streetlights'+'\n')
#print("city,latitude,longitude"+","+','.join(a[0][0:7])+','+a[0][-1].strip())
for i in range(len(b)):
    te=random.randint(1,len(a)-1)
    temp=a.pop(te)
    #print(temp)
    temp[-1]=sum(temp[0:7])
    nt=temp[-1]/10
    latenight=int(4*nt)
    earlymorn=int(3.5*nt)
    aft=int(1.5*nt)
    ln1=int(latenight*0.4)
    ln2=int(latenight*0.6)
    em1=int(earlymorn*0.4)
    em2=int(earlymorn*0.6)
    rem=temp[-1]-ln1-ln2-em1-em2-aft
    rem=rem//7
    #if rem+ln1+ln2+em1+em2+aft>temp[-1]:
        #print(i)
    #print(','.join(b[i])+','+",".join([str(i) for i in temp[0:7]])+','+str(temp[-1])+','+str(random.randint(687,6803)))
    h.write(','.join(b[i])+','+",".join([str(i) for i in temp[0:7]])+','+str(temp[-1])+","+str(ln2)+","+str(em2)+","+str(em1)+","+str(rem)+","+str(rem)+","+str(rem)+","+str(aft)+","+str(rem)+","+str(rem)+","+str(rem)+","+str(rem)+","+str(ln1)+','+str(random.randint(687,6803))+'\n')
f.close()
g.close()
h.close()
f=open('data.txt','r')
dat=f.readlines()
print(len(dat))
