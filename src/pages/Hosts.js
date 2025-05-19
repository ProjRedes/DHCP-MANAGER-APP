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
  box-shadow: 0 0 6px #00f0ff88, inset 0 0 10px #00c3ccbb;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export default function Hosts() {
  const [hosts, setHosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchHosts = async () => {
    setLoading(true);
    try {
      const res = await api.get('/Host');
      setHosts(res.data);
      setError('');
    } catch (err) {
      setError('Erro ao carregar hosts: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHosts();
  }, []);

  return (
    <PageContainer>
      <Title>Hosts Cadastrados</Title>
      {error && <p style={{ color: '#ff4444', fontWeight: '700' }}>{error}</p>}
      {loading ? (
        <p>Carregando hosts...</p>
      ) : hosts.length === 0 ? (
        <p>Nenhum host cadastrado.</p>
      ) : (
        <List>
          {hosts.map((host) => (
            <ListItem key={host.id}>
              <span>
                {host.ip} - {host.nomeNetbios}
              </span>
              <span>{host.mac}</span>
            </ListItem>
          ))}
        </List>
      )}
    </PageContainer>
  );
}
