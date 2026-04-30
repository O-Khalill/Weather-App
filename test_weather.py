import random
import time

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait

cities = [
    "London",
    "Paris",
    "Tokyo",
    "Cairo",
    "New York",
    "Berlin",
    "Dubai",
    "Sydney",
    "Toronto",
    "Madrid",
    "Rome",
    "Moscow",
    "Beijing",
    "Mumbai",
    "Lagos",
    "xyzxyz",
    "123abc",
    "fakecity",
    "nowhere",
    "blah",
]

driver = webdriver.Chrome()
wait = WebDriverWait(driver, 10)

driver.get("http://localhost:5173")


def get_input():
    return wait.until(
        EC.visibility_of_element_located(
            (By.CSS_SELECTOR, "input[placeholder='Enter City']")
        )
    )


end_time = time.time() + 60  # run for 1 minute

while time.time() < end_time:
    city = random.choice(cities)
    inp = get_input()
    inp.clear()
    inp.send_keys(city + Keys.ENTER)
    print(f"Searched: {city}")
    time.sleep(2)

print("Done.")
driver.quit()
