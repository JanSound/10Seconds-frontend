import React, { Text, View } from 'react-native';
import { Image } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

const Loading = () => {
  return (
    <View>
      <View>
        <AnimatedCircularProgress
          size={200}
          width={10}
          fill={100}
          onAnimationComplete={() => console.log('onAnimationComplete')}
          backgroundColor="white"
          tintColor="black"
          duration={10000}
          rotation={0}
        >
          {(fill) => (
            <Image
              source={require('./assets/images/record_image.jpeg')}
              style={{ width: 200, height: 200, borderRadius: 100 }}
            />
          )}
        </AnimatedCircularProgress>
      </View>
    </View>
  );
};

export default Loading;
