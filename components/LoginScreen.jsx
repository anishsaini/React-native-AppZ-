import { View, Text } from "react-native";
import React from "react";
import { Image } from "react-native";
import { Colors } from "../constants/Colors";
import { TouchableOpacity } from "react-native";

export default function LoginScreen() {
  return (
    <View>
      <View style={{ display: "flex", alignItems: "center", marginTop: 110 }}>
        <Image
          source={require("../assets/images/IMG_20240923_190620.jpg")}
          style={{
            width: 220,
            height: 450,
            borderRadius: 20,
            borderWidth: 3,
            borderColor: "brown",
          }}
        ></Image>
      </View>
      <View style={{ backgroundColor: "#fff", marginTop: -20 }}>
        <Text
          style={{
            fontSize: 20,
            fontFamily: "outfit-bold",
            textAlign: "center",
            marginTop: 10,
          }}
        >
          Your Ultimate{" "}
          <Text style={{ color: Colors.PRIMARY }}>Appz For All Your </Text>
          Grocery Needs
        </Text>
        <TouchableOpacity>
          <Text
            style={{
              backgroundColor: Colors.PRIMARY,
              borderRadius: 10,
              padding: 10,
              marginTop: 10,
              marginLeft: 10,
              marginRight: 10,
              textAlign: "center",
            }}
          >
            Let's Get Started
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
