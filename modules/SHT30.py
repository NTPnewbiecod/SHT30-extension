from machine import Pin
from machine import I2C
from time import sleep
import os

SHT30_ADDR = None

def read(addr=0x44):
    global SHT30_ADDR
    machine = os.uname().machine
    if "KidBright32" in machine:
        i2c1 = I2C(1, scl=Pin(5), sda=Pin(4), freq=100000)
    elif "KidMotor V4" in machine:
        i2c1 = I2C(0, scl=Pin(5), sda=Pin(4), freq=100000)
    elif "Mbits" in machine:
        i2c1 = I2C(0, scl=Pin(21), sda=Pin(22), freq=100000)
    else:
        i2c1 = I2C(0, scl=Pin(22), sda=Pin(21), freq=100000)
    if SHT30_ADDR != addr:
        SHT30_ADDR = addr
        i2c1.writeto(SHT30_ADDR, b'\x27\x37')
        sleep(0.2)
    i2c1.writeto(SHT30_ADDR, b'\xE0\x00')
    data = i2c1.readfrom(SHT30_ADDR, 6)
    t = -45 + 175 * (((data[0] << 8) | data[1]) / 0xFFFF)
    h = 100 * (((data[3] << 8) | data[4]) / 0xFFFF)
    return (round(t, 2), round(h, 2))
