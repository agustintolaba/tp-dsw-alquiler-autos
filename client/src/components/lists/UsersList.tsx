import { TipoUsuario, Usuario } from "@/types";
import { Delete } from "@mui/icons-material";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Swal from "sweetalert2";

const adminUserType: TipoUsuario = {
  id: 1,
  descripcion: "Empleado",
};
const clientUserType: TipoUsuario = {
  id: 2,
  descripcion: "Cliente",
};

interface UsersListProps {
  users: Usuario[];
  remove: (user: Usuario) => void;
  edit: (user: Usuario, newTipoUsuario: TipoUsuario) => void;
}
/*
const UsersList: React.FC<UsersListProps> = ({ users, remove, edit }) => {
  const handleRemove = (user: Usuario) => {
    if (
      !confirm(
        `¿Desea eliminar ${user.nombre} ${user.apellido} con email: ${user.email}?`
      )
    ) {
      return;
    }
    remove(user);
  };*/

const UsersList: React.FC<UsersListProps> = ({ users, remove, edit }) => {
  const handleRemove = (user: Usuario) => {
    Swal.fire({
      icon: "question",
      title: `¿Desea eliminar ${user.nombre} ${user.apellido} con email: ${user.email}?`,
      showDenyButton: true,
      confirmButtonText: "Aceptar",
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        remove(user);
      }
    });
  };

  const handleEdit = (user: Usuario, newTipoUsuario: TipoUsuario) => {
    Swal.fire({
      icon: "question",
      title: `¿Desea convertir a ${newTipoUsuario.descripcion} al usuario ${user.nombre} ${user.apellido} con email: ${user.email}?`,
      showDenyButton: true,
      confirmButtonText: "Aceptar",
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        edit(user, newTipoUsuario);
      }
    });
  };

  if (!users) {
    return (
      <div className="flex flex-col w-full h-full items-center justify-center">
        <h6>No se encontraron usuarios</h6>
      </div>
    );
  }

  return (
    <TableContainer sx={{ maxWidth: 600 }} component={Paper}>
      <Table padding="normal" size="small" stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell className="font-bold text-lg">ID</TableCell>
            <TableCell className="font-bold text-lg">Nombre completo</TableCell>
            <TableCell className="font-bold text-lg" align="center">
              Tipo
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user, index) => (
            <TableRow
              key={index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell>{user.id}</TableCell>
              <TableCell>
                {user.nombre} {user.apellido}
              </TableCell>
              <TableCell align="center">
                <Button
                  onClick={() =>
                    handleEdit(
                      user,
                      user.tipoUsuario.id == 2 ? adminUserType : clientUserType
                    )
                  }
                  className="w-28"
                  variant="outlined"
                  color={user.tipoUsuario.id == 1 ? "warning" : "info"}
                >
                  {user.tipoUsuario.descripcion}
                </Button>
              </TableCell>
              <TableCell>
                <Delete
                  className="cursor-pointer text-white hover:text-red-600"
                  onClick={() => handleRemove(user)}
                  color="error"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UsersList;
