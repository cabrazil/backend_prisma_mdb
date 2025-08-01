// Teste super simples para Vercel
export default async function handler(req: any, res: any) {
  console.log('Handler chamado:', req.url);
  
  if (req.url === '/teste') {
    res.status(200).json({ ok: true, message: 'Test endpoint working' });
    return;
  }
  
  if (req.url === '/') {
    res.status(200).json({ 
      status: 'ok', 
      message: 'Server is running', 
      timestamp: new Date().toISOString() 
    });
    return;
  }
  
  res.status(404).json({ error: 'Not found' });
}