import { observer } from 'mobx-react-lite';
import { ViewStyle, View, PlatformColor, StatusBar, Share } from 'react-native';
import { SafeAreaView, useSafeAreaFrame, useSafeAreaInsets } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import KeepAwake from '@sayem314/react-native-keep-awake';

import { TopButton } from './components/TopButton';
import config from '../../config';
import { BottomButton } from './components/BottomButton';
import { AppStackParamList } from '@/navigators';

export const HomeScreen = observer<NativeStackScreenProps<AppStackParamList, 'Home'>>((props) => {
  const safeAreaInsets = useSafeAreaInsets();

  return (
    <>
      <StatusBar hidden />
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
        <View style={{ backgroundColor: '#999', flex: 1 }} />
        <View style={[$bottomContainer, { bottom: safeAreaInsets.bottom }]}>
          <BottomButton iconName="camera.filters" color={PlatformColor('systemPurple')} />
          <BottomButton iconName="ruler" iconSize={40} size={80} />
          <BottomButton
            iconName="moon.fill"
            onPress={() => {
              props.navigation.navigate('AppMask');
              // setAppMaskVisible(true);
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
  columnGap: 40,
};

const $bottomCenterButton: ViewStyle = {};
