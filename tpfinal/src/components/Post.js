import React from "react";
import { Text, View } from "react-native";

function Post({ title, subtitle, description }) {
  return (
    <View>
      <Text>Título: {title}</Text>
      <Text>{subtitle}</Text>
      <Text>{description}</Text>
    </View>
  );
}

export default Post;