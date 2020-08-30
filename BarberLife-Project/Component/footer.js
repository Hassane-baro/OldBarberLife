//Components/cFooter.js
import React from "react";
import { View, Text, StyleSheet } from 'react-native';

function Footer()
{
  return (
    <View style={styles.footer}>
      <Text style={styles.footerText}>© 2020 Copyright: BarberLife Inc</Text>
    </View>
  );
}

const styles = StyleSheet.create(
  {
    footer:
    {
      height: '7%',
      backgroundColor: 'black',
      alignItems: 'center',
      justifyContent: 'center',
    },
    footerText:
    {
      textAlign: 'center',
      color: "white",
      fontWeight: 'bold'
    }
  }
);

export default Footer
