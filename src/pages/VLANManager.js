import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import api from '../services/api';

// ===== Animações =====
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(15px);}
  to { opacity: 1; transform: translateY(0);}
`;
const pulse = keyframes`
  0%, 100% { box-shadow: 0 0 8px #00f0ff;}
  50% { box-shadow: 0 0 20px #00c3cc;}
`;

// ===== Estilos =====
// (Mesma estrutura do que você mandou, com PageContainer, Title, etc.)

const PageContainer = styled.div`
  min-height: 100vh;
  background: #0d0d0d;
  color: #00f0ff;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  padding: 40px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  font-weight: 800;
  margin-bottom: 30px;
  font-size: 2.8rem;
  text-shadow: 0 0 8px #00f0ff, 0 0 16px #00c3cc;
  user-select: none;
`;

const List = styled.ul`
  width: 100%;
  max-width: 540px;
  padding: 0;
  margin-bottom: 40px;
  list-style: none;
`;

const ListItem = styled.li`
  background: #007f99;
  margin-bottom: 14px;
  padding: 16px 24px;
  border-radius: 10px;
  cursor: default;
  animation: ${fadeIn} 0.5s ease forwards;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 0 6px #00f0ff88, inset 0 0 10px #00c3ccbb;
  transition: all 0.3s ease;

  &:hover {
    background: #00f0ff;
    color: #0d0d0d;
    transform: scale(1.05);
    box-shadow: 0 0 16px #00f0ff, inset 0 0 18px #00c3cc;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
`;

const Button = styled.button`
  background: #00c3cc;
  color: #0d0d0d;
  border: none;
  border-radius: 8px;
  padding: 8px 14px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 0 10px #00f0ff66;
  transition: background 0.25s ease, transform 0.25s ease;
  user-select: none;

  &:hover {
    background: #00f0ff;
    transform: scale(1.1);
    box-shadow: 0 0 20px #00f0ff;
  }

  &:active {
    transform: scale(0.95);
  }
`;

const AddButton = styled(Button)`
  align-self: center;
  margin-bottom: 20px;
  padding: 12px 28px;
  font-size: 1.1rem;
  font-weight: 700;
  animation: ${pulse} 2.5s infinite;
`;

const Message = styled.p`
  color: ${(props) => (props.error ? '#ff4444' : '#66ff66')};
  font-weight: 700;
  text-align: center;
  margin-bottom: 20px;
`;

// ===== Modal =====

const ModalBackground = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(13, 13, 13, 0.85);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
`;

const ModalContent = styled.div`
  background: #007f99;
  border-radius: 14px;
  padding: 30px 36px;
  max-width: 420px;
  width: 90%;
  box-shadow: 0 0 20px #00f0ffbb;
  color: #0d0d0d;
  animation: ${fadeIn} 0.3s ease forwards;
`;

const ModalTitle = styled.h2`
  margin-bottom: 18px;
  color: #00f0ff;
  text-align: center;
  text-shadow: 0 0 6px #00c3cc;
`;

const FormField = styled.div`
  margin-bottom: 16px;

  label {
    display: block;
    margin-bottom: 6px;
    font-weight: 600;
    color: #0d0d0d;
  }

  input {
    width: 100%;
    padding: 10px 14px;
    border-radius: 8px;
    border: none;
    font-size: 1rem;
    outline-offset: 2px;
  }
`;

const ModalButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 24px;
`;

const ModalButton = styled(Button)`
  width: 48%;
  background: #00c3cc;
  color: #0d0d0d;
  font-weight: 700;

  &:hover {
    background: #00f0ff;
  }
`;

// ===== Componente de Formulário (Separado dentro do mesmo arquivo pra facilitar) =====
function VlanForm({ editVlan, onClose, onSaved }) {
  const [nome, setNome] = useState(editVlan ? editVlan.nome : '');
  const [obs, setObs] = useState(editVlan ? editVlan.obs : '');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nome.trim()) {
      setMessage('⚠️ O nome da VLAN é obrigatório.');
      return;
    }

    try {
      if (editVlan) {
        await api.put(`/vlans/${editVlan.id}`, { nome, obs });
        setMessage('✅ VLAN atualizada com sucesso!');
      } else {
        await api.post('/vlans', { nome, obs });
        setMessage('✅ VLAN criada com sucesso!');
      }
      onSaved();
    } catch (err) {
      setMessage('❌ Erro ao salvar VLAN: ' + err.message);
    }
  };

  return (
    <>
      {message && <Message error={message.startsWith('❌')}>{message}</Message>}
      <form onSubmit={handleSubmit}>
        <FormField>
          <label>Nome da VLAN:</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Ex: VLAN 10"
            autoFocus
          />
        </FormField>
        <FormField>
          <label>Observação (opcional):</label>
          <input
            type="text"
            value={obs}
            onChange={(e) => setObs(e.target.value)}
            placeholder="Ex: Rede do setor administrativo"
          />
        </FormField>
        <ModalButtonGroup>
          <ModalButton type="submit">{editVlan ? 'Salvar' : 'Criar'}</ModalButton>
          <ModalButton
            type="button"
            onClick={onClose}
            style={{ background: '#cc0000', color: '#fff' }}
          >
            Cancelar
          </ModalButton>
        </ModalButtonGroup>
      </form>
    </>
  );
}

// ===== Página principal do VLAN Manager =====
export default function VLANManager() {
  const [vlans, setVlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const [modalOpen, setModalOpen] = useState(false);
  const [editVlan, setEditVlan] = useState(null);

  const fetchVlans = async () => {
    setLoading(true);
    try {
      const res = await api.get('/vlans');
      setVlans(res.data);
      setError('');
    } catch (err) {
      setError('Erro ao carregar VLANs: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVlans();
  }, []);

  const openAddModal = () => {
    setEditVlan(null);
    setMessage('');
    setModalOpen(true);
  };

  const openEditModal = (vlan) => {
    setEditVlan(vlan);
    setMessage('');
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setMessage('');
  };

  const handleSaved = () => {
    fetchVlans();
    setMessage('Operação realizada com sucesso!');
    closeModal();
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Confirma exclusão desta VLAN?')) return;
    try {
      await api.delete(`/vlans/${id}`);
      setMessage('VLAN excluída com sucesso!');
      fetchVlans();
    } catch (err) {
      setError('Erro ao excluir VLAN: ' + err.message);
    }
  };

  return (
    <PageContainer>
      <Title>Gerenciador de VLANs</Title>
      {message && <Message>{message}</Message>}
      {error && <Message error>{error}</Message>}
      <AddButton onClick={openAddModal}>Cadastrar VLAN</AddButton>
      {loading ? (
        <p>Carregando VLANs...</p>
      ) : (
        <List>
          {vlans.map((vlan) => (
            <ListItem key={vlan.id}>
              <span>{vlan.nome}</span>
              <ButtonGroup>
                <Button onClick={() => openEditModal(vlan)}>Editar</Button>
                <Button
                  style={{ background: '#cc0000', color: '#fff' }}
                  onClick={() => handleDelete(vlan.id)}
                >
                  Excluir
                </Button>
              </ButtonGroup>
            </ListItem>
          ))}
          {vlans.length === 0 && <p>Nenhuma VLAN cadastrada.</p>}
        </List>
      )}

      {modalOpen && (
        <ModalBackground>
          <ModalContent>
            <ModalTitle>{editVlan ? 'Editar VLAN' : 'Cadastrar VLAN'}</ModalTitle>
            <VlanForm editVlan={editVlan} onClose={closeModal} onSaved={handleSaved} />
          </ModalContent>
        </ModalBackground>
      )}
    </PageContainer>
  );
}
