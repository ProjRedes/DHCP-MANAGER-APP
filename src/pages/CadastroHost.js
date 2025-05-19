import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import api from '../services/api';

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

const Form = styled.form`
  background: #007f99;
  border-radius: 14px;
  padding: 28px 32px;
  max-width: 420px;
  width: 100%;
  box-shadow: 0 0 20px #00f0ffbb;
  color: #0d0d0d;
`;

const FormField = styled.div`
  margin-bottom: 20px;

  label {
    display: block;
    margin-bottom: 8px;
    font-weight: 700;
    color: #0d0d0d;
  }

  input, select {
    width: 100%;
    padding: 10px 14px;
    border-radius: 8px;
    border: none;
    font-size: 1rem;
    outline-offset: 2px;
  }
`;

const Button = styled.button`
  background: #00c3cc;
  color: #0d0d0d;
  border: none;
  border-radius: 10px;
  padding: 14px 20px;
  font-weight: 700;
  width: 100%;
  cursor: pointer;
  box-shadow: 0 0 12px #00f0ff88;
  transition: background 0.3s ease;

  &:hover {
    background: #00f0ff;
  }
`;

const Message = styled.p`
  color: ${(props) => (props.error ? '#ff4444' : '#66ff66')};
  font-weight: 700;
  margin-top: 14px;
  text-align: center;
`;

export default function CadastroHost() {
  const [ip, setIp] = useState('');
  const [nomeNetbios, setNomeNetbios] = useState('');
  const [mac, setMac] = useState('');
  const [vlans, setVlans] = useState([]);
  const [vlanId, setVlanId] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    async function fetchVlans() {
      try {
        const res = await api.get('/vlans');
        setVlans(res.data);
      } catch {
        setVlans([]);
      }
    }
    fetchVlans();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!ip.trim() || !nomeNetbios.trim() || !mac.trim() || !vlanId) {
      setMessage('⚠️ Todos os campos são obrigatórios.');
      return;
    }

    try {
      await api.post('/hosts', { ip, nomeNetbios, mac, vlanId });
      setMessage('✅ Host cadastrado com sucesso!');
      setIp('');
      setNomeNetbios('');
      setMac('');
      setVlanId('');
    } catch (err) {
      setMessage('❌ Erro ao cadastrar host: ' + err.message);
    }
  };

  return (
    <PageContainer>
      <Title>Cadastrar Host</Title>
      <Form onSubmit={handleSubmit}>
        <FormField>
          <label>IP Address:</label>
          <input
            type="text"
            value={ip}
            onChange={(e) => setIp(e.target.value)}
            placeholder="Ex: 192.168.0.100"
          />
        </FormField>
        <FormField>
          <label>Nome NetBIOS:</label>
          <input
            type="text"
            value={nomeNetbios}
            onChange={(e) => setNomeNetbios(e.target.value)}
            placeholder="Ex: workstation01"
          />
        </FormField>
        <FormField>
          <label>MAC Address:</label>
          <input
            type="text"
            value={mac}
            onChange={(e) => setMac(e.target.value)}
            placeholder="Ex: 00:1A:2B:3C:4D:5E"
          />
        </FormField>
        <FormField>
          <label>VLAN:</label>
          <select
            value={vlanId}
            onChange={(e) => setVlanId(e.target.value)}
          >
            <option value="">Selecione uma VLAN</option>
            {vlans.map((vlan) => (
              <option key={vlan.id} value={vlan.id}>
                {vlan.nome}
              </option>
            ))}
          </select>
        </FormField>
        <Button type="submit">Cadastrar Host</Button>
        {message && <Message error={message.startsWith('❌')}>{message}</Message>}
      </Form>
    </PageContainer>
  );
}
