({
    name: "SHT30", // Category Name
    description: "Temperature and Humidity Sensor",
    author: "ArtronShop",
    category: "Sensors",
    version: "1.1.0",
    icon: "/static/icon.png", // Category icon
    color: "#8b507c", // Category color (recommend some blocks color)
    blocks: [ // Blocks in Category
        "sht30_read",
    ], 
    supportArduinoPlatform: true,
    depends: [ // Arduino library
        "ArtronShop_SHT3x@1.0.0"
    ]
});
