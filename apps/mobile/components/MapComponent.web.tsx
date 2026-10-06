import React from "react";
import { Text, View } from "react-native";

interface MapComponentProps {
  onPress?: (event: any) => void;
  showsUserLocation?: boolean;
}

export default function MapComponent(_props: MapComponentProps) {
  return (
    <View className="flex-1 items-center justify-center bg-gray-900 p-5">
      <Text className="text-white text-center">
        Maps are available in the Android and iOS app.
      </Text>
    </View>
  );
}
