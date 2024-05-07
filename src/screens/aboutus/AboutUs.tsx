import React from 'react';
import {View, Text, Image, ScrollView} from 'react-native';
const logo = require('../../assets/logo2.png');
import styles from './AboutUsStyle';

const AboutUs: React.FC = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={logo} style={styles.logo} />
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.headerText}>RTV News</Text>
        <Text style={styles.descriptionText}>
          RTV is a trusted news app that provides live updates and in-depth
          coverage on global events. Designed to enhance user understanding of
          current affairs, RTV offers an easy-to-navigate platform with diverse
          news categories. Our team ensures the content is accurate and
          up-to-date, adhering to the highest journalistic standards. RTV is
          dedicated to maintaining integrity and transparency, keeping you
          informed and engaged.
        </Text>
      </View>
    </ScrollView>
  );
};

export default AboutUs;
