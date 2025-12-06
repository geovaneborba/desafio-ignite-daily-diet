import styled from 'styled-components/native'

export const ModalOverlay = styled.Pressable`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: flex-end;
`

export const ModalContent = styled.View`
  background-color: white;
  padding-bottom: 24px;
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
`

export const ModalFooter = styled.View`
  width: 100%;
  align-items: flex-end;
  padding: 16px;
  flex-direction: row;
  justify-content: flex-end;
  gap: 16px;
`

export const ModalButtonText = styled.Text`
  color: #333638;
  font-weight: bold;
  font-size: 16px;
`
