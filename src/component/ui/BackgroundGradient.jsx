// import React from "react";
// import { motion } from "framer-motion"; // Note: Use `framer-motion` instead of `motion/react`
// import { cn } from "../../lib/util";

// export const BackgroundGradient = ({
//   children,
//   className,
//   containerClassName,
//   animate = true,
// }) => {
//   const variants = {
//     initial: {
//       backgroundPosition: "0 50%",
//     },
//     animate: {
//       backgroundPosition: ["0 50%", "100% 50%", "0 50%"],
//     },
//   };

//   return (
//     <div className={cn("relative p-[4px] group", containerClassName)}>
//       <motion.div
//         variants={animate ? variants : undefined}
//         initial={animate ? "initial" : undefined}
//         animate={animate ? "animate" : undefined}
//         transition={
//           animate
//             ? {
//                 duration: 5,
//                 repeat: Infinity,
//                 repeatType: "reverse",
//               }
//             : undefined
//         }
//         style={{
//           backgroundSize: animate ? "400% 400%" : undefined,
//         }}
//         className={cn(
//           "absolute inset-0 rounded-3xl z-[1] opacity-60 group-hover:opacity-100 blur-xl transition duration-500 will-change-transform",
//           "bg-[radial-gradient(circle_farthest-side_at_0_100%,#00ccb1,transparent),radial-gradient(circle_farthest-side_at_100%_0,#7b61ff,transparent),radial-gradient(circle_farthest-side_at_100%_100%,#ffc414,transparent),radial-gradient(circle_farthest-side_at_0_0,#1ca0fb,#141316)]"
//         )}
//       />
//       <motion.div
//         variants={animate ? variants : undefined}
//         initial={animate ? "initial" : undefined}
//         animate={animate ? "animate" : undefined}
//         transition={
//           animate
//             ? {
//                 duration: 5,
//                 repeat: Infinity,
//                 repeatType: "reverse",
//               }
//             : undefined
//         }
//         style={{
//           backgroundSize: animate ? "400% 400%" : undefined,
//         }}
//         className={cn(
//           "absolute inset-0 rounded-3xl z-[1] will-change-transform",
//           "bg-[radial-gradient(circle_farthest-side_at_0_100%,#00ccb1,transparent),radial-gradient(circle_farthest-side_at_100%_0,#7b61ff,transparent),radial-gradient(circle_farthest-side_at_100%_100%,#ffc414,transparent),radial-gradient(circle_farthest-side_at_0_0,#1ca0fb,#141316)]"
//         )}
//       />

//       <div className={cn("relative z-10", className)}>{children}</div>
//     </div>
//   );
// };



import React from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/util";

export const BackgroundGradient = ({
  children,
  className,
  containerClassName,
  animate = true,
}) => {
  const variants = {
    initial: {
      backgroundPosition: "0 50%",
    },
    animate: {
      backgroundPosition: ["0 50%", "100% 50%", "0 50%"],
    },
  };

  return (
    <div className={cn("relative p-[1px] group", containerClassName)}>
      {/* Reduced glow layer */}
      <motion.div
        variants={animate ? variants : undefined}
        initial={animate ? "initial" : undefined}
        animate={animate ? "animate" : undefined}
        transition={
          animate
            ? {
                duration: 5,
                repeat: Infinity,
                repeatType: "reverse",
              }
            : undefined
        }
        style={{
          backgroundSize: animate ? "400% 400%" : undefined,
        }}
        className={cn(
          "absolute inset-0 rounded-3xl z-[1] opacity-40 group-hover:opacity-60 blur-md transition duration-500 will-change-transform", // Reduced blur and opacity
          "bg-[radial-gradient(circle_farthest-side_at_0_100%,#00ccb1,transparent),radial-gradient(circle_farthest-side_at_100%_0,#7b61ff,transparent),radial-gradient(circle_farthest-side_at_100%_100%,#ffc414,transparent),radial-gradient(circle_farthest-side_at_0_0,#1ca0fb,#141316)]"
        )}
      />
      
      {/* Main gradient layer - also reduced */}
      <motion.div
        variants={animate ? variants : undefined}
        initial={animate ? "initial" : undefined}
        animate={animate ? "animate" : undefined}
        transition={
          animate
            ? {
                duration: 5,
                repeat: Infinity,
                repeatType: "reverse",
              }
            : undefined
        }
        style={{
          backgroundSize: animate ? "400% 400%" : undefined,
        }}
        className={cn(
          "absolute inset-0 rounded-3xl z-[1] will-change-transform opacity-80", // Reduced base opacity
          "bg-[radial-gradient(circle_farthest-side_at_0_100%,#00ccb1,transparent),radial-gradient(circle_farthest-side_at_100%_0,#7b61ff,transparent),radial-gradient(circle_farthest-side_at_100%_100%,#ffc414,transparent),radial-gradient(circle_farthest-side_at_0_0,#1ca0fb,#141316)]"
        )}
      />

      <div className={cn("relative z-10", className)}>{children}</div>
    </div>
  );
};