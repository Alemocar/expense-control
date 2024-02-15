import PropTypes from "prop-types"

const Message = ({ children, tipo, ...props }) => {
  return (
    <div className={`alerta ${tipo}`} {...props}>
      {children}
    </div>
  )
}

Message.propTypes = {
  children: PropTypes.node.isRequired,
  tipo: PropTypes.string.isRequired,
}

export default Message
