import { useNavigation } from "@react-navigation/native";
import {
  Button,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function LoginScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Image source={require("../assets/logo.png")} style={styles.img} />
      <Text style={styles.title}>Entre na sua conta</Text>
      <Text style={styles.subtitle}>
        Ainda não tem cadastro?{" "}
        <Pressable onPress={() => navigation.navigate("signup")}>
          <Text style={styles.signupLink}>Cadastre-se</Text>
        </Pressable>
      </Text>
      <TextInput
        placeholder="username"
        placeholderTextColor="gray"
        style={styles.input}
      />
      <TextInput
        placeholder="senha"
        placeholderTextColor="gray"
        style={styles.input}
      />
      <Pressable onPress={() => navigation.navigate("pwreset")}>
        <Text style={styles.link}>Esqueceu a senha?</Text>
      </Pressable>
      <Button title="Acessar" style={styles.button} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 15,
  },
  img: {
    width: 150,
    height: 150,
    resizeMode: "contain",
  },
  title: {
    fontSize: 30,
    fontWeight: 700,
  },
  subtitle: {
    fontSize: 20,
    verticalAlign: "top",
  },
  signupLink: {
    fontSize: 20,
    color: "purple",
    textDecorationLine: "underline",
    textDecorationStyle: "solid",
    textDecorationColor: "purple",
  },
  link: {
    fontSize: 20,
    textDecorationLine: "underline",
    textDecorationStyle: "solid",
    textDecorationColor: "black",
  },
  input: {
    width: 300,
    height: 40,
    borderColor: "lightgray",
    borderWidth: 2,
    borderRadius: 10,
  },
  button: {
    padding: 10,
    backgroundColor: "purple",
  },
});
