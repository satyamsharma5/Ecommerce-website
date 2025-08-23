email = input("Enter Your Email Name: ")  # Example input: g@g.in

k = 0
j = 0
d = 0

if len(email) >= 6:
    if email[0].isalpha():
        if ("@" in email) and (email.count("@") == 1):
            if email.rfind(".") > email.index("@") + 1:
                for i in email:
                    if i.isspace():
                        k = 1
                    elif i.isalpha():
                        if i.isupper():
                            j = 1
                    elif i.isdigit():
                        continue
                    elif i in "_@.":
                        continue
                    else:
                        d = 1

                if k == 1 or j == 1 or d == 1:
                    print("Wrong Email!")
                else:
                    print("Right Email!")
            else:
                print("Wrong Email! Missing or misplaced '.'")
        else:
            print("Wrong Email! '@' issue.")
    else:
        print("Wrong Email! First character should be a letter.")
else:
    print("Wrong Email! Too short.")