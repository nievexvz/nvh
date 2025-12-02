import { motion } from 'framer-motion'

function FloatingElements() {
  const elements = [
    { id: 1, color: 'from-purple-500/10 to-pink-500/10', size: 120, x: '10%', y: '20%' },
    { id: 2, color: 'from-blue-500/10 to-cyan-500/10', size: 80, x: '80%', y: '40%' },
    { id: 3, color: 'from-green-500/10 to-emerald-500/10', size: 100, x: '20%', y: '70%' },
    { id: 4, color: 'from-yellow-500/10 to-orange-500/10', size: 60, x: '70%', y: '10%' },
  ]
  
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {elements.map((element) => (
        <motion.div
          key={element.id}
          className={`absolute rounded-full blur-3xl ${element.color}`}
          style={{
            width: `${element.size}px`,
            height: `${element.size}px`,
            left: element.x,
            top: element.y,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 20, 0],
          }}
          transition={{
            duration: 5 + element.id,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut'
          }}
        />
      ))}
    </div>
  )
}

export default FloatingElements