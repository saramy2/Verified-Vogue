import { motion } from 'framer-motion';
import { textContainer, textVariant2 } from '../utils/motion';

export const TypingText = ({ title, textStyles }) => (
    <motion.span
        variants={textContainer}
        viewport={{ once: true }}
        className={`${textStyles}`}
    >
        {Array.from(title).map((letter, index) => (
            <motion.span variants={textVariant2} key={index}>
                {letter === ' ' ? '\u00A0' : letter}
            </motion.span>
        ))}
    </motion.span>
);