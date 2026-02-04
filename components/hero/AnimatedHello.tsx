import * as motion from "motion/react-client";

const parentVariant = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.34, delayChildren: 0.4 },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: -100 },
  visible: { opacity: 1, y: 0 },
};

export default function AnimatedHello() {
  return (
    <motion.div
      variants={parentVariant}
      initial="hidden"
      animate="visible"
      className="absolute top-[40%] left-1/2 w-[80vw] max-w-[900px] -translate-x-1/2 -translate-y-1/2"
    >
      <svg
        viewBox="0 0 1356 620"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-auto w-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient
            id="paint0_linear_66_19"
            x1="192"
            y1="0"
            x2="192"
            y2="620"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="white" stopOpacity="0.48" />
            <stop offset="0.668269" stopColor="#121212" stopOpacity="0.15" />
          </linearGradient>
          <linearGradient
            id="paint1_linear_66_19"
            x1="549"
            y1="0"
            x2="549"
            y2="620"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="white" stopOpacity="0.48" />
            <stop offset="0.668269" stopColor="#121212" stopOpacity="0.15" />
          </linearGradient>
          <linearGradient
            id="paint2_linear_66_19"
            x1="790"
            y1="0"
            x2="790"
            y2="620"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="white" stopOpacity="0.48" />
            <stop offset="0.668269" stopColor="#121212" stopOpacity="0.15" />
          </linearGradient>
          <linearGradient
            id="paint3_linear_66_19"
            x1="951"
            y1="0"
            x2="951"
            y2="620"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="white" stopOpacity="0.48" />
            <stop offset="0.668269" stopColor="#121212" stopOpacity="0.15" />
          </linearGradient>
          <linearGradient
            id="paint4_linear_66_19"
            x1="1196"
            y1="0"
            x2="1196"
            y2="620"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="white" stopOpacity="0.48" />
            <stop offset="0.668269" stopColor="#121212" stopOpacity="0.15" />
          </linearGradient>
        </defs>
        {/* H */}
        <motion.path
          variants={childVariants}
          d="M0.727273 496L62.5455 123.636H163.636L139.636 269.091H273.455L297.455 123.636H398.545L336.727 496H235.636L259.636 350.545H125.818L101.818 496H0.727273Z"
          fill="url(#paint0_linear_66_19)"
        />
        {/* e */}
        <motion.path
          variants={childVariants}
          d="M528.273 501.091C498.455 501.091 473.727 495.394 454.091 484C434.455 472.485 420.636 456 412.636 434.545C404.636 412.97 403.182 387.152 408.273 357.091C413.121 328.242 423.121 303.03 438.273 281.455C453.545 259.879 472.758 243.091 495.909 231.091C519.182 219.091 545.242 213.091 574.091 213.091C595.182 213.091 613.667 216.364 629.545 222.909C645.545 229.455 658.576 238.97 668.636 251.455C678.697 263.939 685.485 279.03 689 296.727C692.636 314.303 692.636 334.182 689 356.364L685.364 379.636H435.909L444.636 324.364H601.727C602.939 316.364 602.152 309.333 599.364 303.273C596.697 297.091 592.394 292.303 586.455 288.909C580.636 285.394 573.606 283.636 565.364 283.636C557.121 283.636 549.364 285.394 542.091 288.909C534.939 292.424 528.818 297.333 523.727 303.636C518.758 309.939 515.424 317.333 513.727 325.818L502.818 384C501.364 392.97 501.909 400.97 504.455 408C507 415.03 511.424 420.545 517.727 424.545C524.03 428.545 532.152 430.545 542.091 430.545C548.879 430.545 555.303 429.636 561.364 427.818C567.545 425.879 573 423.091 577.727 419.455C582.576 415.697 586.455 411.152 589.364 405.818H681C674.455 425.212 664.091 442.061 649.909 456.364C635.848 470.545 618.515 481.576 597.909 489.455C577.424 497.212 554.212 501.091 528.273 501.091Z"
          fill="url(#paint1_linear_66_19)"
        />
        {/* l */}
        <motion.path
          variants={childVariants}
          d="M878.364 123.636L816.545 496H716.182L778 123.636H878.364Z"
          fill="url(#paint2_linear_66_19)"
        />
        {/* l */}
        <motion.path
          variants={childVariants}
          d="M1039.36 123.636L977.545 496H877.182L939 123.636H1039.36Z"
          fill="url(#paint3_linear_66_19)"
        />
        {/* o */}
        <motion.path
          variants={childVariants}
          d="M1172 501.091C1141.7 501.091 1116.73 495.091 1097.09 483.091C1077.58 470.97 1063.88 454.121 1056 432.545C1048.12 410.848 1046.55 385.697 1051.27 357.091C1056 328.485 1065.88 303.394 1080.91 281.818C1095.94 260.121 1115.27 243.273 1138.91 231.273C1162.55 219.152 1189.58 213.091 1220 213.091C1250.18 213.091 1275.03 219.152 1294.55 231.273C1314.18 243.273 1327.94 260.121 1335.82 281.818C1343.82 303.394 1345.45 328.485 1340.73 357.091C1336 385.697 1326.06 410.848 1310.91 432.545C1295.76 454.121 1276.36 470.97 1252.73 483.091C1229.21 495.091 1202.3 501.091 1172 501.091ZM1184.36 426.909C1193.09 426.909 1201.03 424.061 1208.18 418.364C1215.45 412.667 1221.64 404.545 1226.73 394C1231.94 383.455 1235.76 370.909 1238.18 356.364C1240.61 341.697 1240.97 329.152 1239.27 318.727C1237.58 308.182 1234.06 300.061 1228.73 294.364C1223.39 288.667 1216.36 285.818 1207.64 285.818C1198.91 285.818 1190.91 288.667 1183.64 294.364C1176.36 300.061 1170.18 308.182 1165.09 318.727C1160 329.152 1156.24 341.697 1153.82 356.364C1151.39 370.909 1150.97 383.455 1152.55 394C1154.24 404.545 1157.76 412.667 1163.09 418.364C1168.55 424.061 1175.64 426.909 1184.36 426.909Z"
          fill="url(#paint4_linear_66_19)"
        />
      </svg>
    </motion.div>
  );
}
