import { View, Text, TextInput } from "react-native";
import React from "react";
import { useUser } from "@clerk/clerk-expo";
import { Colors } from "../../constants/Colors";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function Header() {
  //   const { user } = useUser();
  return (
    <View
      style={{ padding: 20, paddingTop: 50, backgroundColor: Colors.PRIMARY }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        {/* <Image
          source={{ uri: user?.imageUrl }}
          style={{ width: 50, height: 50, borderRadius: 25 }}
        /> */}
      </View>
      {/* <View>
        <Text>
          {" "}
          {user?.fullName} style={{ fontSize: 20, fontFamily: "outfit" }}
        </Text>
      </View> */}

      <View>
        <FontAwesome name="search" size={24} color={Colors} />
        <TextInput placeholder="Search..." />
      </View>
    </View>
  );
}
