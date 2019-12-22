import smtplib
conn = smtplib.SMTP('smtp.gmail.com',587)# connect to gmail
conn.ehlo()
conn.starttls()
conn.login('ishankdev@gmail.com','Password')
conn.sendmail('ishankdev@gmal.com','ishank47@gmail.com','Subject: I am in trouble\n\n Please help') # write your email and recipient address here
conn.quit()
