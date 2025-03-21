import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { dynamicBorderRadius, dynamicFontSize, dynamicIconSize, Themes } from '../Themes/color';
import CustomIcons from '../Themes/CustomIcons';

const StopWatchBox = ({ flashshales }: any) => {
  const [timeLeft, setTimeLeft] = useState(0);
  const [time, setTime] = useState({ hours: "00", minutes: "00", seconds: "00" });

  useEffect(() => {    
    const endTime = new Date(flashshales.end_time).getTime();
    const interval = setInterval(() => {
      const timeRemaining = endTime - Date.now();
      if (timeRemaining <= 0) {
        clearInterval(interval);
        setTimeLeft(0);
      } else {
        setTimeLeft(timeRemaining);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [flashshales]);

  useEffect(() => {
    const seconds = Math.floor((timeLeft / 1000) % 60);
    const minutes = Math.floor((timeLeft / 1000 / 60) % 60);
    const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
    setTime({hours: hours.toString().padStart(2, '0'),minutes: minutes.toString().padStart(2, '0'),seconds: seconds.toString().padStart(2, '0'),});
  }, [timeLeft]);

  return (
    <View style={styles.block5}>
      <View style={styles.stopwatch}>
        <CustomIcons color={Themes.color8} name="stopwatch" size={dynamicIconSize * 0.5} />
      </View>
      <View style={styles.stopwatch}>
        <Text style={styles.stopwatchtime}>{time.hours}</Text>
      </View>
      <View style={styles.stopwatch}>
        <Text style={styles.stopwatchtime}>{time.minutes}</Text>
      </View>
      <View style={styles.stopwatch}>
        <Text style={styles.stopwatchtime}>{time.seconds}</Text>
      </View>
    </View>
  );
};

export default StopWatchBox;

const styles = StyleSheet.create({
  block5: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  stopwatch: {
    height: '70%',
    width: '20%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Themes.color3,
    borderRadius: dynamicBorderRadius * 0.25,
  },
  stopwatchtime: {
    fontWeight: 'bold',
    fontSize: dynamicFontSize,
    color: Themes.color9,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: dynamicFontSize,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
