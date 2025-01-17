from machine import Pin
from machine import I2C
from time import sleep
import os

SHT30_ADDR = None

def read(addr=0x44):
    global SHT30_ADDR
    i2c_instance = None
    machine = os.uname().machine
    if "KidBright32" in machine:
        i2c_instance = I2C(1, scl=Pin(5), sda=Pin(4), freq=100000)
    elif "KidMotor V4" in machine:
        i2c_instance = I2C(0, scl=Pin(5), sda=Pin(4), freq=100000)
    elif ("Mbits" in machine) or ("OpenBIT" in machine):
        i2c_instance = I2C(0, scl=Pin(21), sda=Pin(22), freq=100000)
    else:
        i2c_instance = I2C(0, scl=Pin(22), sda=Pin(21), freq=100000)
    if SHT30_ADDR != addr:
        SHT30_ADDR = addr
        i2c_instance.writeto(SHT30_ADDR, b'\x27\x37')
        sleep(0.2)
    i2c_instance.writeto(SHT30_ADDR, b'\xE0\x00')
    data = i2c_instance.readfrom(SHT30_ADDR, 6)
    # idk why. but it throw error OSError [Errno 19] ENODEV
    # seem like it can't find the this goddamm I2C sensor. from what i found on StackOverflow.
    # and i put the delay here and it gone. WTF.
    sleep(1.0)
    temperture = -45 + 175 * (((data[0] << 8) | data[1]) / 0xFFFF)
    humidity = 100 * (((data[3] << 8) | data[4]) / 0xFFFF)
    return (round(temperture, 2), round(humidity, 2))
