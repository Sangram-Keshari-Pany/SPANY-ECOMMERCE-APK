import { Backgroundcolor, Themes } from './color';
import React from 'react';
import { Dimensions, View } from 'react-native';
import Svg, { Defs, G, LinearGradient, Path, Rect, Stop } from 'react-native-svg';
const { width, height, scale } = Dimensions.get('screen');



const MyIcon = ({ width, height }:any) => {
  return (
    <Svg  width={width} height={height} viewBox="0 0 488 559" fill="none">
      <Path d="M444.3 556.9C439.74 558.07 434.96 558.69 429.99 558.69H58.0099C22.8999 558.69 -4.09017 527.62 0.78983 492.86L5.34983 460.44H258.25L444.29 556.9H444.3Z" fill="url(#paint0_linear_4338_2312)" />
      <Path d="M444.38 188.37C440.36 159.86 415.98 138.65 387.16 138.65H371.63L367.31 107.88C358.65 46.4302 306.07 0.700195 244 0.700195C212.96 0.700195 184.31 12.1302 162.32 31.2502C140.32 50.3702 125.04 77.1702 120.72 107.88L116.37 138.65H100.84C89.3801 138.65 78.6001 142.02 69.5301 147.91C67.9301 148.91 66.35 150.03 64.86 151.22C57.83 156.81 52.12 164.01 48.29 172.35L192.68 247.22H452.67L444.39 188.37H444.38ZM173.01 138.65L176.24 115.7C180.97 82.1102 210.1 56.8002 243.99 56.8002C277.88 56.8002 307.02 82.1102 311.74 115.7L314.97 138.65H173H173.01Z" fill="url(#paint1_linear_4338_2312)" />
      <Path d="M444.3 556.9L258.26 460.44L175.82 417.7L22.5498 338.22L43.6198 188.37C44.4098 182.69 46.0098 177.32 48.2898 172.35L192.68 247.22L302.66 304.25L473.12 392.64L487.21 492.87C491.42 522.71 472.08 549.84 444.3 556.9Z" fill="url(#paint2_linear_4338_2312)" />
      <G style="mix-blend-mode:multiply" opacity="0.3">
        <Path d="M444.3 556.9C439.74 558.07 434.96 558.69 429.99 558.69H360.69C345.75 523.06 306.27 495.55 258.26 460.44L444.3 556.9Z" fill="black" />
      </G>
      <G style="mix-blend-mode:multiply" opacity="0.3">
        <Path d="M192.68 247.21L48.29 172.34C52.12 164 57.82 156.81 64.86 151.21C66.35 150.01 67.9301 148.9 69.5301 147.9C87.0201 179.64 152.52 221.65 192.68 247.21Z" fill="black" />
      </G>
      <Defs>
        <LinearGradient id="paint0_linear_4338_2312" x1="100.2" y1="684.87" x2="285.09" y2="423.47" gradientUnits="userSpaceOnUse">
          <Stop/>
          <Stop offset="1" stopColor="#1F509A" />
        </LinearGradient>
        <LinearGradient id="paint1_linear_4338_2312" x1="359.11" y1="27.7002" x2="193.34" y2="305.04" gradientUnits="userSpaceOnUse">
          <Stop/>
          <Stop offset="1" stopColor="#1F509A" />
        </LinearGradient>
        <LinearGradient id="paint2_linear_4338_2312" x1="9.48981" y1="228.31" x2="524.85" y2="524.78" gradientUnits="userSpaceOnUse">
          <Stop stopColor="#001F3F" />
          <Stop offset="1" stopColor="#006BFF" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
};

export default MyIcon;


export const CreateScreenSvg = () => {
  return (
    <Svg  width={width} height={height} viewBox="0 0 375 812" fill="none">
      <Defs>
        <LinearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
          <Stop offset="50%" stopColor={Themes.svgcolor1} />
          <Stop offset="100%" stopColor={Themes.svgcolor2} />
        </LinearGradient>

        <LinearGradient id="gradient2" x1="20%" y1="30%" x2="30%" y2="90%">
          <Stop offset="10%" stopColor={Themes.svgcolor3} />
          <Stop offset="100%" stopColor={Themes.svgcolor4} />
        </LinearGradient>
      </Defs>
      <Path d="M149.237 157.191C116.216 286.524 -45.9048 161.1 -68.0053 64.9774C-90.1057 -31.1454 -61.2453 -117.739 24.2087 -152.265C109.663 -186.791 179.467 -129.479 217.161 -54.0902C254.856 21.299 182.259 27.8587 149.237 157.191Z" fill="url(#gradient1)"/>
      <Path d="M405.963 64.974C463.48 -13.2608 527.361 119.326 527.361 186.372C527.361 253.419 473.009 307.771 405.963 307.771C338.916 307.771 275.716 256.724 284.564 186.372C293.413 116.02 348.446 143.209 405.963 64.974Z" fill="url(#gradient2)" />
    </Svg>
  );
};

export const LoginscreenSvg = () => {
  return (
    <Svg  width={width} height={height} viewBox="0 0 375 812" fill="none">
      <Defs>
        <LinearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
          <Stop offset="50%" stopColor={Themes.svgcolor1} />
          <Stop offset="100%" stopColor={Themes.svgcolor2} />
        </LinearGradient>

        <LinearGradient id="gradient2" x1="20%" y1="30%" x2="30%" y2="90%">
          <Stop offset="10%" stopColor={Themes.svgcolor3} />
          <Stop offset="100%" stopColor={Themes.svgcolor4} />
        </LinearGradient>

        <LinearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="50%" stopColor={Themes.svgcolor1} />
            <Stop offset="100%" stopColor={Themes.svgcolor2} />
        </LinearGradient>
      </Defs>
      <Path d="M532.592 737.646C626.561 868.528 384.573 901.354 278.768 866.976C172.963 832.598 115.061 718.957 149.439 613.152C183.817 507.347 290.971 487.269 389.928 510.907C488.885 534.546 438.623 606.764 532.592 737.646Z" fill="url(#gradient1)" />
      <Path d="M350.132 392.879C302.333 420.118 299.823 336.772 315.273 302.07C330.724 267.368 371.381 251.761 406.083 267.211C440.785 282.662 456.392 323.319 440.941 358.021C425.491 392.723 397.931 365.641 350.132 392.879Z" fill="url(#gradient2)" />
      <Path d="M201.008 266.33C161.149 422.443 -19.5441 258.17 -61.2191 155.021C-102.894 51.8718 -53.0593 -65.5313 50.0897 -107.206C153.239 -148.881 237.498 -79.7022 282.998 11.2978C328.498 102.298 240.867 110.216 201.008 266.33Z" fill="url(#gradient3)" />
      <Path d="M42.9996 -131.222C138.438 -261.036 244.435 -41.0359 244.435 70.214C244.435 181.464 154.25 271.65 42.9996 271.65C-68.2502 271.65 -158.436 181.464 -158.436 70.214C-158.436 -41.0359 -52.4385 -1.40715 42.9996 -131.222Z" fill="url(#gradient2)" />
    </Svg>
  );
};

export const PasswordScreenSvg = () => {
  return (
    <Svg  width={width} height={height} viewBox="0 0 375 812" fill="none">
      <Defs>
        <LinearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
          <Stop offset="50%" stopColor={Themes.svgcolor1} />
          <Stop offset="100%" stopColor={Themes.svgcolor2} />
        </LinearGradient>

        <LinearGradient id="gradient2" x1="20%" y1="30%" x2="30%" y2="90%">
          <Stop offset="10%" stopColor={Themes.svgcolor3} />
          <Stop offset="100%" stopColor={Themes.svgcolor4} />
        </LinearGradient>
      </Defs>
      <Path d="M201.008 266.33C161.149 422.443 -19.5441 258.17 -61.2191 155.021C-102.894 51.8718 -53.0593 -65.5313 50.0897 -107.206C153.239 -148.881 237.498 -79.7022 282.998 11.2978C328.498 102.298 240.867 110.216 201.008 266.33Z" fill="url(#gradient1)" />
      <Path d="M42.9996 -131.222C138.438 -261.036 244.435 -41.0359 244.435 70.214C244.435 181.464 154.25 271.65 42.9996 271.65C-68.2502 271.65 -158.436 181.464 -158.436 70.214C-158.436 -41.0359 -52.4385 -1.40715 42.9996 -131.222Z" fill="url(#gradient2)" />
    </Svg>
  );
};
export const HelloCardScreenSvg = () => {
  return (
    <Svg  width={width} height={height} viewBox="0 0 375 812" fill="none">
      <Defs>
        <LinearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
          <Stop offset="50%" stopColor={Themes.svgcolor1} />
          <Stop offset="100%" stopColor={Themes.svgcolor2} />
        </LinearGradient>

        <LinearGradient id="gradient2" x1="20%" y1="30%" x2="30%" y2="90%">
          <Stop offset="10%" stopColor={Themes.svgcolor3} />
          <Stop offset="100%" stopColor={Themes.svgcolor4} />
        </LinearGradient>
      </Defs>
      <Path d="M511.592 631.646C605.561 762.528 363.573 795.354 257.768 760.976C151.963 726.598 94.0602 612.957 128.438 507.152C162.816 401.347 284.146 352.436 368.928 404.907C453.71 457.379 417.623 500.764 511.592 631.646Z" fill="url(#gradient1)" />
      <Path d="M53.9997 -83.545C149.438 -213.36 255.435 6.64084 255.435 117.891C255.435 229.141 165.25 319.326 53.9997 319.326C-57.2502 319.326 -147.436 229.141 -147.436 117.891C-147.436 6.64084 -41.4384 46.2696 53.9997 -83.545Z" fill="url(#gradient2)" />
    </Svg>
  );
};

export const PasswordRecoveryScreenSvg = () => {
  return (
    <Svg  width={width} height={height} viewBox="0 0 375 812" fill="none">
      <Defs>
        <LinearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
          <Stop offset="50%" stopColor={Themes.svgcolor1} />
          <Stop offset="100%" stopColor={Themes.svgcolor2} />
        </LinearGradient>

        <LinearGradient id="gradient2" x1="20%" y1="30%" x2="30%" y2="90%">
          <Stop offset="10%" stopColor={Themes.svgcolor3} />
          <Stop offset="100%" stopColor={Themes.svgcolor4} />
        </LinearGradient>
      </Defs>
      <Path d="M106.559 86.2492C-48.0682 40.9659 122.411 -133.884 226.952 -171.934C331.493 -209.983 447.085 -156.082 485.135 -51.541C523.184 52.9997 451.107 134.793 358.574 177.089C266.042 219.386 261.187 131.532 106.559 86.2492Z" fill="url(#gradient1)" />
      <Path d="M509.384 -57.7891C635.788 42.1213 412.223 140.376 301.041 136.494C189.859 132.611 102.875 39.333 106.758 -71.8491C110.64 -183.031 203.919 -270.015 315.101 -266.132C426.283 -262.25 382.979 -157.7 509.384 -57.7891Z" fill="url(#gradient2)" />
    </Svg>
  );
};

export const EmptyWishlist = ({ width, height }:any) => {
  return (
    <Svg width={width} height={height} viewBox='0 0 223 188' fill="none">
      <Path d="M161.806 0.000809708C151.863 0.05236 143.101 2.56465 136.421 6.29537C131.801 8.87603 128.182 12.0429 125.128 15.5066L133.921 40.3811L105.74 75.9015L133.921 109.098L109.132 143.622L121.135 112.75L83.8203 76.5654L109.653 42.0409L95.0408 13.4916C92.3151 10.6164 88.7345 7.95693 85.7986 6.29537C78.872 2.42647 69.7053 -0.131166 59.3042 0.00618465C57.8184 0.0256848 56.3077 0.0995114 54.7744 0.233187C42.5078 1.30287 28.8131 6.15292 18.4004 16.066C7.98785 25.9791 0.855987 40.9576 0.0712191 56.5055C-0.713479 72.0534 4.84883 88.1713 23.6063 108.855C42.3638 129.538 74.316 154.785 91.0049 168.906C107.694 183.027 109.118 186.021 110.474 187.02C110.688 187.177 110.899 187.273 111.11 187.27C111.321 187.272 111.532 187.177 111.745 187.02C113.101 186.021 114.527 183.027 131.216 168.906C147.904 154.785 179.856 129.538 198.614 108.855C217.371 88.1713 222.934 72.0534 222.149 56.5055C221.364 40.9576 214.232 25.9791 203.82 16.066C193.407 6.15292 179.712 1.30287 167.446 0.233187C165.529 0.0660362 163.647 -0.00874035 161.806 0.000809708Z" fill={Themes.svgcolor1}/>
    </Svg>
  )
};


export const EmptyCart = ({ width, height }: any) => {
  return (
    <Svg  width={width} height={height} viewBox="0 0 488 559" fill="none">
      <Path d="M444.3 556.9C439.74 558.07 434.96 558.69 429.99 558.69H58.0099C22.8999 558.69 -4.09017 527.62 0.78983 492.86L5.34983 460.44H258.25L444.29 556.9H444.3Z" fill={Themes.color3} opacity={0.5}/>
      <Path d="M444.38 188.37C440.36 159.86 415.98 138.65 387.16 138.65H371.63L367.31 107.88C358.65 46.4302 306.07 0.700195 244 0.700195C212.96 0.700195 184.31 12.1302 162.32 31.2502C140.32 50.3702 125.04 77.1702 120.72 107.88L116.37 138.65H100.84C89.3801 138.65 78.6001 142.02 69.5301 147.91C67.9301 148.91 66.35 150.03 64.86 151.22C57.83 156.81 52.12 164.01 48.29 172.35L192.68 247.22H452.67L444.39 188.37H444.38ZM173.01 138.65L176.24 115.7C180.97 82.1102 210.1 56.8002 243.99 56.8002C277.88 56.8002 307.02 82.1102 311.74 115.7L314.97 138.65H173H173.01Z" fill={Themes.color3}  opacity={0.5} />
      <Path d="M444.3 556.9L258.26 460.44L175.82 417.7L22.5498 338.22L43.6198 188.37C44.4098 182.69 46.0098 177.32 48.2898 172.35L192.68 247.22L302.66 304.25L473.12 392.64L487.21 492.87C491.42 522.71 472.08 549.84 444.3 556.9Z" fill={Themes.color3}  opacity={0.5} />
      <Path d="M444.3 556.9C439.74 558.07 434.96 558.69 429.99 558.69H360.69C345.75 523.06 306.27 495.55 258.26 460.44L444.3 556.9Z" fill={Themes.color17} opacity={0.2}/>
      <Path d="M192.68 247.21L48.29 172.34C52.12 164 57.82 156.81 64.86 151.21C66.35 150.01 67.9301 148.9 69.5301 147.9C87.0201 179.64 152.52 221.65 192.68 247.21Z" fill={Themes.color17} opacity={0.2}/>
    </Svg>
  )
};
export const CardChip = ({ width, height }: any) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 192.756 192.756">
      <Path fill-rule="evenodd" clip-rule="evenodd" fill="transparent" d="M0 0h192.756v192.756H0V0z" />
      <Path d="M149.762 179.375c21.973 0 39.951-17.979 39.951-39.951V52.991c0-20.21-15.211-37.038-34.748-39.608H37.063C17.611 15.953 2.932 32.781 2.932 52.991v86.433c0 21.973 17.35 39.951 39.323 39.951h107.507z" fill-rule="evenodd" clip-rule="evenodd" />
      <Path d="M149.762 179.375c21.973 0 39.951-17.979 39.951-39.951V52.991c0-20.21-15.211-37.038-34.748-39.608H37.063C17.611 15.953 2.932 32.781 2.932 52.991v86.433c0 21.973 17.35 39.951 39.323 39.951h107.507z" fill-rule="evenodd" clip-rule="evenodd" fill="#e7c63d" />
      <Path d="M114.479 34.109l-9.672 31.089 18.238 10.363v42.166l-18.516 10.287 9.121 40.988m0 0s31.088-.027 42.557.037c23.627-5.6 24.117-30.748 24.117-30.748m0 0l9.484.074M114.479 23.331h38.965c26.807 4.284 26.807 31.503 26.807 31.503m-.001 0h9.395m-66.411 21.479l10.035-11.066 56.375.063m-66.322 31.44l56.65.09m9.95-20.628l-9.949.026.088 41.048h9.861m-66.877.001l9.949 10.779h56.65M3.023 138.051l8.655-.037m0 0s-.276 24.457 22.683 30.775c5.504.176 42.295.088 42.295.088m0 0l9.083-41.639-17.963-9.951.089-41.59 18.364-9.672-8.781-42.595m0 0s-9.534.013-35.925.026c-26.252.151-29.845 28.937-29.569 31.677-3.316.116-8.942.103-8.942.103m.111 9.823l55.294-.088 9.635 10.977m-65.218-.112h9.031l.088 41.728h-9.12m.064 10.137l55.483.15 9.396-10.564M11.678 96.512l56.098.025" fill="none" stroke="#000" stroke-width="2.212" stroke-miterlimit="2.613" />
    </Svg>
  )
};
export const Like = ({ width, height,color1,color2 }: any) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 29 24" fill="none">
      <Defs>
        <LinearGradient id="paint0_linear_4417_2173" x1="10%" y1="10%" x2="90%" y2="90%" gradientUnits="userSpaceOnUse">
          <Stop stopColor={color1}/>
          <Stop offset="1" stopColor={color2} />
        </LinearGradient>
        <LinearGradient id="paint1_linear_4417_2173" x1="0%" y1="0%" x2="100%" y2="100%" gradientUnits="userSpaceOnUse">
          <Stop stopColor={color1}/>
          <Stop offset="1" stopColor={color2}  />
        </LinearGradient>
      </Defs>
      <Path d="M28.1055 5.0839C28.7033 6.66164 28.6851 8.64725 27.6082 10.9912C26.0097 14.4689 22.0899 18.7064 14.5 23.4124C6.91009 18.7064 2.99026 14.4689 1.39182 10.9912C0.314907 8.64724 0.296716 6.66164 0.894454 5.0839C1.49507 3.49857 2.74088 2.26369 4.30118 1.47405C7.45076 -0.119904 11.7043 0.173915 14.1293 2.8537L14.5 3.26341L14.8707 2.8537C17.2957 0.173915 21.5492 -0.119904 24.6988 1.47405C26.2591 2.26369 27.5049 3.49857 28.1055 5.0839Z" fill="url(#paint0_linear_4417_2173)" stroke="url(#paint1_linear_4417_2173)" />
    </Svg>
  )
};

export const EmptyLike = ({ width, height,color1,color2 }: any) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 29 24" fill="none">
      <Defs>
        <LinearGradient id="paint1_linear_4417_2173" x1="0%" y1="0%" x2="100%" y2="100%" gradientUnits="userSpaceOnUse">
          <Stop stopColor={color1}/>
          <Stop offset="1" stopColor={color2}  />
        </LinearGradient>
      </Defs>
      <Path d="M28.1055 5.0839C28.7033 6.66164 28.6851 8.64725 27.6082 10.9912C26.0097 14.4689 22.0899 18.7064 14.5 23.4124C6.91009 18.7064 2.99026 14.4689 1.39182 10.9912C0.314907 8.64724 0.296716 6.66164 0.894454 5.0839C1.49507 3.49857 2.74088 2.26369 4.30118 1.47405C7.45076 -0.119904 11.7043 0.173915 14.1293 2.8537L14.5 3.26341L14.8707 2.8537C17.2957 0.173915 21.5492 -0.119904 24.6988 1.47405C26.2591 2.26369 27.5049 3.49857 28.1055 5.0839Z"  stroke="url(#paint1_linear_4417_2173)" />
    </Svg>
  )
};


