import * as React from "react";
import { TextInput, Button, View, StyleSheet, Text } from "react-native";
import { useSignUp } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { Colors } from "@/constants/Colors";

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [code, setCode] = React.useState("");
  const [emailError, setEmailError] = React.useState(null);
  const [passwordError, setPasswordError] = React.useState(null);
  const [codeError, setCodeError] = React.useState(null);

  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      await signUp.create({
        emailAddress,
        password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      setPendingVerification(true);
    } catch (err: any) {
      if (err.code === "invalid_email") {
        setEmailError("Invalid email address" as any);
      } else if (err.code === "password_too_weak") {
        setPasswordError("Password is too weak" as any);
      } else {
        console.error(JSON.stringify(err, null, 2));
      }
    }
  };
  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        router.replace("/");
      } else {
        setCodeError("Invalid verification code" as any);
      }
    } catch (err: any) {
      setCodeError("Invalid verification code" as any);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Sign Up</Text>
        {!pendingVerification && (
          <>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                autoCapitalize="none"
                value={emailAddress}
                placeholder="Email..."
                onChangeText={(email) => {
                  setEmailAddress(email);
                  setEmailError(null);
                }}
              />
              {emailError && <Text style={styles.error}>{emailError}</Text>}
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={password}
                placeholder="Password..."
                secureTextEntry={true}
                onChangeText={(password) => {
                  setPassword(password);
                  setPasswordError(null);
                }}
              />
              {passwordError && (
                <Text style={styles.error}>{passwordError}</Text>
              )}
            </View>
            <View style={styles.button}>
              <Button title="Sign Up" onPress={onSignUpPress} />
            </View>
          </>
        )}
        {pendingVerification && (
          <>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={code}
                placeholder="Code..."
                onChangeText={(code) => {
                  setCode(code);
                  setCodeError(null);
                }}
              />
              {codeError && <Text style={styles.error}>{codeError}</Text>}
            </View>
            <View style={styles.button}>
              <Button title="Verify Email" onPress={onPressVerify} />
            </View>
          </>
        )}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  formContainer: {
    width: 300,
    padding: 20,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    paddingHorizontal: 10,
  },
  error: {
    fontSize: 12,
    color: "red",
    marginBottom: 10,
  },
  button: {
    color: Colors.PRIMARY,
    padding: 10,
    borderRadius: 5,
  },
});
``;
