from datetime import date, datetime

dob_input = input("Enter your date of birth (M/D/YYYY): ")

birthday = datetime.strptime(dob_input, "%m/%d/%Y").date()

today = date.today()

age = today.year - birthday.year

if (today.month, today.day) < (birthday.month, birthday.day):
    age -= 1

print(f"You are {age} years old.")