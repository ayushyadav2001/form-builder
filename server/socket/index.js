module.exports = (io) => {
  io.on('connection', (socket) => {
    socket.on('joinForm', (formId) => {
      socket.join(`form:${formId}`);
    });
  });
};