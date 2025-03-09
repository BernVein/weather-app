import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, ImageBackground, Dimensions } from "react-native";
import axios from "axios";
import Icon from "react-native-vector-icons/FontAwesome5";

const API_KEY = "96f3ced1ace3e9998d94331e1214c037";
export default function WeatherScreen() {
    const [city, setCity] = useState("Manila");
    const [weather, setWeather] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const [searchedCity, setSearchedCity] = useState("");

    useEffect(() => {
        fetchWeather();
    }, [city]);

    const fetchWeather = async () => {
        try {
            setError(null);
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
            );
            setWeather(response.data);
        } catch (err) {
            console.error("Error fetching weather:", err);
            setError("City not found. Please enter a valid city.");
            setWeather(null);
        }
    };
const { width, height } = Dimensions.get("window");

    const capitalizeCityName = (name: string): string => { 
        return name
            .toLowerCase()
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
    };

const getWeatherIcon = (description: string) => {
    const lowerDesc = description.toLowerCase();

    if (lowerDesc.includes("clear")) return { name: "sun", color: "#FFD700" };
    if (lowerDesc.includes("cloud")) return { name: "cloud", color: "#B0C4DE" };
    if (lowerDesc.includes("rain")) return { name: "cloud-rain", color: "#1E90FF" };
    if (lowerDesc.includes("thunderstorm")) return { name: "bolt", color: "#FF4500" };
    if (lowerDesc.includes("snow")) return { name: "snowflake", color: "#ADD8E6" };
    if (lowerDesc.includes("mist") || lowerDesc.includes("fog")) return { name: "smog", color: "#808080" };

    return { name: "question-circle", color: "#FFFFFF" };
};


    

    return (
        <View style={styles.container}>
            <ImageBackground
                source={require("../assets/images/x.avif")}
                style={styles.background}
                imageStyle={{ width: "120%", height: "120%" }} 
                resizeMode="cover"
            >
                <View style={styles.card}>
                <View style={styles.searchBar}>
                    <TextInput
                        style={{ flex: 1, color: "#000" }}
                        placeholder="Search city"
                        value={searchedCity}
                        placeholderTextColor="#888"
                        onChangeText={(text) => setSearchedCity(text)}
                        onSubmitEditing={() => setCity(searchedCity)}
                    />
                    {searchedCity.length > 0 && (
                        <Icon name="times" size={16} color="#888" onPress={() => setSearchedCity("")} />
                    )}
                </View>

                    {error && <Text style={styles.errorText}>{error}</Text>}
                    {weather && (
                        <View style={styles.weatherContainer}>
                        
                            <Icon
                                name={getWeatherIcon(weather.list[0].weather[0].description).name}
                                color={getWeatherIcon(weather.list[0].weather[0].description).color}
                                size={width < 768 ? 80 : 100}
                                style={styles.weatherIcon}
                            />

                            <View style={styles.weatherInfo}>
                                <Text style={styles.temperature}>{Math.round(weather.list[0].main.temp)}°C</Text>
                                <Text style={styles.weatherCondition}>{weather.list[0].weather[0].description}</Text>
                                <Text style={styles.cityName}>{capitalizeCityName(city)}, {weather.city.country}</Text>
                                <View style={styles.extraInfo}>
                                    <View style={styles.infoItem}>
                                        <Icon name="tint" size={20} color="#00BFFF" />
                                        <Text style={styles.infoText}>{weather.list[0].main.humidity}% Humidity</Text>
                                    </View>
                                    <View style={styles.infoItem}>
                                        <Icon name="wind" size={20} color="#87CEEB" />
                                        <Text style={styles.infoText}>{weather.list[0].wind.speed} km/h Wind</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    )}
                </View>
            </ImageBackground>
        </View>
    );
}
const { width, height } = Dimensions.get("window");
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: width < 768 ? "center": "flex-start",
        alignContent: "center",
    },
    background: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    card: {
        backgroundColor: "transparent",
        alignItems: "center",
        width: "100%",
    },
    
    
    searchBar: {
        backgroundColor: "#fff",
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 25,
        width: width < 768 ? "auto" : "30%",
        textAlign: "left",
        color: "#000",
        fontSize: 16,
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    
    
        
    weatherContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: width < 768 ? "center" : "flex-start", 
        flexWrap: "wrap", 
    },
    weatherIcon: {
        marginRight: width < 768 ? 10 : 15,
        marginTop: width < 768 ? 5 : 15,
        
        alignSelf: width < 768 ? "center" : "flex-start", 
    },
    weatherInfo: {
        alignItems: width < 768 ? "center" : "flex-start",
    },
    temperature: {
        fontSize: 60, 
        fontWeight: "bold",
        color: "#fff",
        textAlign: "center",
    },
    weatherCondition: {
        fontSize: 22,
        color: "#fff",
        textAlign: "center",
        textTransform: "capitalize",
    },
    cityName: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold",
        textAlign: "center",
    },
    
    extraInfo: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 20, 
        marginTop: 15,
    },
    
    infoItem: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
    },
    infoText: {
        color: "#fff",
        fontSize: 16,
    },
    errorText: {
        color: "red",
        fontSize: 16,
        textAlign: "center",
        marginTop: 10,
      },
});
