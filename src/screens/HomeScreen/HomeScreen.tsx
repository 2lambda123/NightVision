import { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { ViewStyle, View, PlatformColor, Share, InteractionManager } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import KeepAwake from '@sayem314/react-native-keep-awake';
import { requestReview } from 'react-native-store-review';

import { TopButton } from './components/TopButton';
import { BottomButton } from './components/BottomButton';
import config from '@/config';
import { DepthCamera } from '@/components';
import { AppStackParamList } from '@/navigators';

export const HomeScreen = observer<NativeStackScreenProps<AppStackParamList, 'Home'>>((props) => {
  const safeAreaInsets = useSafeAreaInsets();
  const [distanceRectVisible, setDistanceRectVisible] = useState(false);

  useEffect(() => {
    if (!__DEV__) {
      setTimeout(() => {
        InteractionManager.runAfterInteractions(requestReview);
      }, 3000);
    }
  }, []);

  return (
    <>
      <KeepAwake />
      <View style={$container}>
        <View
          style={[
            $topContainer,
            {
              top: safeAreaInsets.top,
            },
          ]}
        >
          <TopButton
            iconName="gearshape"
            onPress={() => {
              props.navigation.navigate('Settings');
            }}
          />
          <TopButton
            iconName="square.and.arrow.up"
            onPress={() => Share.share({ url: config.appStoreUrl.global })}
          />
        </View>

        <DepthCamera distanceRectVisible={distanceRectVisible} />

        <View style={[$bottomContainer, { bottom: safeAreaInsets.bottom }]}>
          <BottomButton iconName="camera.filters" color={PlatformColor('systemPurple')} />
          <BottomButton
            iconName="ruler"
            iconSize={40}
            size={80}
            onPress={() => {
              setDistanceRectVisible((prev) => !prev);
            }}
          />
          <BottomButton
            iconName="moon.fill"
            onPress={() => {
              props.navigation.navigate('AppMask');
            }}
          />
        </View>
      </View>
    </>
  );
});

const $container: ViewStyle = {
  flex: 1,
};

const $topContainer: ViewStyle = {
  position: 'absolute',
  zIndex: 1,
  width: '100%',
  paddingTop: 10,
  paddingHorizontal: 26,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
};

const $bottomContainer: ViewStyle = {
  position: 'absolute',
  zIndex: 1,
  width: '100%',
  paddingBottom: 20,
  paddingHorizontal: 26,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  columnGap: 50,
};

const $bottomCenterButton: ViewStyle = {};
